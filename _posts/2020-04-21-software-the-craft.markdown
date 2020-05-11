## Am I a hotshot engineer?
I've spent the last year and nine months working for Atlassian, one of the most renowned software companies out there. As a grad hire straight out of college, I've been working thus far as a full-stack engineer for the Statuspage team. 
I had reached the point where I began to feel quite confident in my work. I felt I had a firm handle on the majority of our Ruby on Rails, TypeScript, React codebase. For most smaller sized tasks, I could get them over the line without too much trouble. I began to ask myself - "How can I keep development interesting, and continue to learn, when I have a task that, for the most part, I already know how to implement?"
A major contribution to this issue at that moment was my sub-team had recently been handed projects that weren't quite as technically challenging. So how could I keep myself challenged? Besides working on a project dealing with a technical aspect I hadn't worked with before, I wasn't sure what to focus on to improve. Or, to be frank, that there was anything I needed to focus on.

## SHOCKER: I was wrong
At this point, I thought I had a pretty solid understanding of what "good" code entailed. One of the key tenents: well thought out, descriptive comments.

In fact, I was thinking about leading the charge on adding a better documentation scheme to our codebase (something like YARD). This would give us a pattern to add descriptive comments for each method and class, in a consistent format, and provide us with useful generated documentation for files implementing it.

Good idea, right? I thought so. The more comments the better!

And then I read this quote.

> The proper use of comments is to compensate for our failure to express ourself in code.

DAMN.

## Reframing my focus
The above quote is from a book I picked up recently called Clean Code, by Robert Martin. It's provided some extremely valuable takeaways thus far - I've had several moments where he's described a pattern to avoid that I regrettably realized I had made use of countless times in the past.

One of these takeaways is the aspiration of self-documenting code, which the quote above is in reference to. In essence, you should write code that is clear enough such that someone can read it and quickly grasp what's going on. Without comments. Of course, this isn't always possible, and he explains some valid use cases where comments are necessary. The message spoke to me though on a much deeper level.

I now continually think about the following questions: How can I make my code readable? What patterns can I use to enhance maintainability? How can I write code such that future developers looking at it, who have zero context on that section of the code, can quickly understand what's going on?

In the span of a few pages, my focus had shifted from learning enough to execute tasks quickly to learning how to implement solutions most effectively. Software engineering is a craft - and I needed to focus on the craft.

## This isn't a book review
I'm not going to list out the remaining suggestions from the book. If you want to learn more, I highly recommend reading it. The purpose of this article isn't as a book review or a summary.

The true value of this book, for me, more than any particular piece of advice, is that it shattered my preconceived notions of what writing code entails. More than learning how to write code better, I've learned how to continually challenge myself while writing it.

## Opportunity and risk: looking forward
Every line of code written, even assuming it works perfectly upon implementation, is both an opportunity and a risk.

The opportunity: write an elegant piece of code that stands the test of time, causing no headaches in the future for the countless people who will read it down the line.

The risk: write code that works today, but causes trouble tomorrow. If a teammate has to git blame it, figure out I wrote it, and message me asking for help understanding it I've done my job wrong.

Looking forward, no matter what project or task I'm assigned, I now know I can make it interesting and technically rigorous by asking myself how I can:
a) incrementally improve the code that's already there,
b) write new code that takes advantage of the opportunity described above, or ideally
c) both a & b

Of course, one giant caveat to all this is to not let "perfect be the enemy of good." So it's important to follow this practice while still keeping the current project's deadline in mind ;).