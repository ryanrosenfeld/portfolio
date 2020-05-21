---
description: A few Ruby lessons I picked up after a year on the job.
image: 'assets/images/ruby.png'
---
# A story born out of shame 
Through my first 11 months on the job, I have learned a fair amount on best practices when creating Ruby classes – however, there is always more to learn. As I found out from a somewhat embarassing explanation from my manager of why some code I had written was bad in front of my whole team.

So, following this are some guidelines I’ve picked up over my time so far to follow when writing classes.

# The guidelines

## #1: Never use instance variables to track value changes between function calls

This is what my manager critiqued me on specifically. The example below summarizes what NOT to do:

```ruby
class Foo
  private
  
  def some_loop_task
    @current_status = false
    5.times { some_task }
    # use @current_status in some way
  end
  
  def some_task
    # do some stuff
    @current_status = some_value
  end
end
```

In short: never use an instance variable to track the state of something between method calls. The issue here is that `some_loop_task` relies on `some_task` to modify this instance variable, but this isn’t immediately clear. What if the order is switched in some way? What if a developer down the road removes the instance variable update in `some_task`, not realizing it’s needed for the method that calls it?

You may be wondering, what’s a better way to do this? Reformatting to something like below would be one possible example – but really it depends on the situation. Just don’t do it .

```ruby
class Foo
  private
  
  def some_loop_task
    current_status = false
    5.times { current_status = some_task }
    # use current_status in some way
  end
  
  def some_task
    # do some stuff
    some_value
  end
end
```

## #2: When and how to use attr_accessors

These are great shorthand for quickly creating the appropriate getter and setter methods for a class. If you’re unaware, they can be used like so:

```ruby
class Foo
  attr_reader :x # can be read but not modified
  attr_accessor :y, :z # can be read and written to
  attr_writer :k # can just be written to
  
  def initialize(x, y, z, k)
    @x = x
    @y = y
    @z = z
    @k = k
  end
  
  # you can do either of these implementations of bar 
  # (see explanation below)
  
  # option 1 -- preferred method
  def bar
    self.y = x + z
  end
  
  # option 2
  def bar2
    @y = x + z
  end
end

my_foo = Foo.new(1, 2, 3, 4)
my_foo.bar # ==> 5
my_foo.y # ==> 5
my_foo.z = 8
my_foo.bar # ==> 9 
```

But you may be wondering – when should these be used instead of referencing the plain instance variable? The answer is… pretty much all of the time.

The main advantage to accessor methods over regular instance variables is that you can change the implementation of them without changing the interface. This way, if something changes down the line all of the references to it don’t have to be changed. It also allows you to decide what level of access to the variable should be provided.

You may also be wondering about the 2 options for implementing the bar method. Before we jump into that, let’s start with a major caveat:

Almost always prefer using an `attr_reader` over `attr_accessor` or `attr_writer`. If it’s only a reader, having it accessible from outside the class is much safer and can be done without much thought. In addition, instance variables should generally only be set on init and left alone – there’s rarely a need to be able to mutate them, and if the value is consistent with what’s passed in it makes for cleaner, more maintainable code.

Given this caveat, we’ll still examine the bar method scenario because it presents the one case where simply referencing a variable does not work quite as intended.

So, diving in if you try and intuitively use this implementation: `y = x + z`, can you guess what might occur? Basically, ruby doesn’t know whether you’re trying to set a new local variable or use the setter method for y. In this case, setting the local variable takes precedence, so it will make a new local variable and won’t touch the instance variable.

There are two ways around this. One is to modify the instance variable directly, which bypasses the setter method. However, as discussed previously there are benefits to using these methods, so while this works there’s a slightly better way. This leads us to the preferred method, which is to add an explicit self reference so that Ruby knows for sure you meant to call the y method on the instance of the class.

## #3: Make use of private methods where applicable

If you don’t ever need to call the method outside the class itself, make it private. This helps tremendously for several reasons:
- You don’t have to worry about any external dependencies when modifying methods
- You can (somewhat) ensure these methods will never get called elsewhere*
- It simplifies the job for consumers of the class to see what methods are available
- In general, it makes it easier to follow the code within the class

As a caveat, you may be wondering if this will make the class more difficult to test. However, testing can encapsulate the outcomes of your private methods by testing the public methods in which they are used. Also, this ensures your results stay the same, but its easier to move around the internals of how they’re calculated without constantly having to adjust your test suite.

* You can still call methods outside the class even when they’re made private by using send, so it’s not completely isolated. However, this is considered a bad practice so shouldn’t be something to worry about – in general, if you find yourself needing to use send always lean towards using public_send instead to avoid this anti-pattern. *

## #4: Eager loading vs. lazy loading

Let’s say you have an expensive calculation you have to make at some point in the class. You may be wondering: when should I perform this calculation? Your natural inclination may be to do it upfront in the constructor to get it out of the way. Or, it may be to load it only when you need it. This is the difference between eager loading in the former case, versus lazy loading in the latter.

The choice between these two very much depends on the situation. Just keep in mind that anything added to the initializer will be run every single time the class is created, and if there’s a chance that an expensive calculation may not be required it’s much better to lazy load it in a separate method. A solid strategy for this is found in the guideline below.

## #5: A pattern for reusing calculated values

This is a really easy way of loading things only once and making use of them like they’re a regular variable. Example below:

```ruby
class Foo
  attr_reader :bar

  def initialize(bar)
    @bar = bar
  end
  
  def foobar
    @foobar ||= expensive_calculation(bar * 5)
  end
  
  private
  
  def expensive_calculation(x)
    # do expensive stuff
  end
end
```

`||=` is a highly convenient Ruby shorthand method. The example above is equivalent to `@foobar = @foobar || bar * 5`. It’s a great way to only set a variable to a value if it hasn’t been set to anything before.

Memoization, on the other hand, is an optimization technique that stands for storing expensive calculations so they don’t have to be repeated over and over. In this case, no matter how many times the foobar method is called, it will only have to calculate the value the first time.

While the memoization in this example is optional as long as this isn’t an expensive calculation, this is a great way to access the calculated result quickly. From now on, you can just use foobar like a normal variable for ease of use, and it’ll only have to be calculated the first time.