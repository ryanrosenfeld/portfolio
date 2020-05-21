---
description: Dealing with mistakes when just starting out.
image: assets/images/broken_plate.jpg
---
# The task
Recently, I worked on a story that was estimated at one story point – approximately a half day of work. The ticket was based around our integration with JiraOps. 

When we created the link to a Jira Ops site, we kicked off an asynchronous job to retrieve information from Jira. However, before this job finished we saved the link in our database, which led to problems down the line – we had to make sure we had handling everywhere this information was used, in order to catch for cases when the information from Jira had not been loaded yet.

So, my humble one point ticket – underestimated, as we didn’t initially realize the scope of the changes necessary (a problem that will be discussed later) – was to make this asynchronous process synchronous. Basically, before saving the link to the DB the application has to wait for the information from Jira to be retrieved, so that we’re only storing links to Jira that have all the information necessary.

# The first rollback
I went on my way, making the necessary changes, testing locally, going through the pr process, and eventually merging with master and kicking off a deployment. The standard procedure. Life was good.

But then…

The deployment failed. Usually when this happens it is because of a random failure, and retrying will do the trick. But this time, it was because a semantic check failed. 

What’s a “semantic check,” you my ask? When my friendly neighborhood SRE told me this was the case, I thought the same thing. While it’s always fun to learn something new, I have to say it is even more so when it’s causing deployments to fail and you're responsible.

Turns out, semantic checks are pre-deployment scripts that can test things in a more production like environment before actually deploying stuff out – basically a final fail safe we use that catches things not always seen in local tests. This in and of itself isn’t a huge problem, as it prevented my changes from being deployed. 

“Okay, just have to fix the semantic check and re-deploy!”, I thought. However, Sentry (an error tracking software we use) started reporting that a large amount of asynchronous jobs were failing.

How? I thought my changes weren’t deployed? How can code that isn’t in production be causing problems?

Turns out, the code was in production  . At Statuspage, we have different clusters that host code, and the cluster used for Jira ops is different than the cluster we use for the other code changes i made. So, most of my code was deployed.

This leads my discussion to a more real problem, something I didn’t realize was a vital policy when dealing with asynchronous jobs. Whenever one deletes an asynchronous job, they must first remove the code that enqueues the job, release that in production, and then only once no more jobs are scheduled can they delete the job.

Basically, any leftover jobs that were queued up were failing, because the job no longer existed.

Eek!

This lead me to push out my first rollback.

# The second rollback
While some might say the first rollback was an acceptable error, considering my newness to dealing with asynchronous jobs and lack of knowledge on the policy discussed previously when deleting them, the second was simply… stupid.

But, it also provides some valuable lessons.

After fixing the semantic check issue, I added back the job, and also the necessary methods that were being used for it. Or so I thought. Got the approvals on the pr, merged it again, pushed it out – so hopeful. This time, I made sure to monitor the “Statuspage Chat Ops” room more closely to look for errors, which is another valuable lesson I got out of this and something that should always be done when pushing out a deploy.

But bang! The jobs were still failing. 

“Oh no!!!” I thought. Luckily, this time my response time was quicker, but the problem I caused was way more basic. While I thought I added in the needed methods, it turns out I missed adding in a method that the job relies on.

Manually testing this case was difficult locally, so when I was working on this I relied on our coded test suite. Sadly, our test cases didn’t catch this because the method was stubbed out, rather than the network call performed inside of the method. Another lesson – always stub methods at the lowest possible level, so that as many lines of code are tested as possible.

The last problem that led to this was not code related. It was mentality related. As I mentioned previously, the story was supposed to be one story point, however at this point it had dragged on for almost three days. This led to some internally applied pressure to get it over the line, and a hearty portion of annoyance that it had taken so long. This mentality issue led me to not look over my changes quite as carefully as necessary, and as part of that perform important searches through the code base to make sure that any deleted code is, in fact, unused. An especially important step with the inability to perform manual testing.

# Deployment #3
Luckily, my third attempt at deployment went through without any hitches. Also luckily, the problems I created in production did not impact any end users. However, it is vital to learn from these mistakes so I don’t make similar ones in the future, ones that would impact our users. So, in learning all of this, I thought I’d share my experience and learnings. Hopefully you can get something out of this, to avoid making similar mistakes to myself in the future!

# Key takeaways
- If you’re ever removing an asynchronous job, make sure you first remove the enqueueing of it, and then in a second deploy remove the job itself
- When dealing with async jobs, and similar items, it’s a good idea to have an SRE review it
- Just because a deploy failed doesn’t always mean that no code has been released into production
- Always monitor the Statuspage Chat Ops room, or your team’s equivalent, when deploying
- Stub methods at the lowest possible level
- Whenever you delete functions, it’s important to make sure they’re not in use anywhere
- Don’t let time pressure, whether imposed on you or self-imposed, impact the rigor with which you make sure your code is correct