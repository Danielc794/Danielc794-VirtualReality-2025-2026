import random

# Delay importing/creating turtle objects until a display is available.
# Call `init_turtle()` from the runner (for example, from `main.py`) after
# any virtual display (Xvfb / pyvirtualdisplay) is started.
turtle = None
t = None

def init_turtle():
  """Initialize the turtle module and the global Turtle `t`.

  This avoids importing `turtle` at module-import time so a virtual X
  display can be started first (required for headless runs).
  """
  global turtle, t
  if turtle is None:
    import turtle as _turtle
    turtle = _turtle
    t = turtle.Turtle()
    turtle.colormode(255)


def jump(x,y):
  if t is None:
    raise RuntimeError('turtle not initialized — call init_turtle() first')
  t.penup()
  t.goto(x,y)
  t.pendown()

def move(x):
  if t is None:
    raise RuntimeError('turtle not initialized — call init_turtle() first')
  t.penup()
  t.forward(x)
  t.pendown()

def curve1():
  if t is None:
    raise RuntimeError('turtle not initialized — call init_turtle() first')
  t.left(50)
  for i in range(199):
    t.right(0.5)
    t.forward(5.71)

def curve2():
  if t is None:
    raise RuntimeError('turtle not initialized — call init_turtle() first')
  t.right(50)
  for i in range(199):
    t.left(0.5)
    t.forward(5.71)
    
def home():
  if t is None:
    raise RuntimeError('turtle not initialized — call init_turtle() first')
  t.penup()
  t.home()
  t.pendown()

def stars1():
  if t is None:
    raise RuntimeError('turtle not initialized — call init_turtle() first')
  for i in range(3000):
    w = random.randint(1,2)
    x = random.randint(-500,500)
    y = random.randint(-300,300)
    r = random.randint(250,255)
    g = random.randint(250,255)
    b = random.randint(250,255)
    t.pencolor(r,g,b)
    jump(x,y)
    t.width(w)
    t.circle(1)

def comet():
  if t is None:
    raise RuntimeError('turtle not initialized — call init_turtle() first')
  for i in range(255):
    t.pencolor(0+1*i,0+1*i,0+1*i)
    t.width(int(0.05+0.05*i))
    t.forward(1)

def circles(x):
  if t is None:
    raise RuntimeError('turtle not initialized — call init_turtle() first')
  for i in range(10):
    t.pencolor(150+5*i,150+5*i,150+5*i)
    t.begin_fill()
    t.fillcolor(200-5*i,200-5*i,200-5*i)
    t.circle(x-i*0.75)
    t.end_fill()
    t.left(90)
    move(0.75)
    t.right(90)
    
def circles2(x):
  if t is None:
    raise RuntimeError('turtle not initialized — call init_turtle() first')
  for i in range(20):
    t.pencolor(0+5*i,0+5*i,0+5*i)
    t.begin_fill()
    t.fillcolor(5*i,5*i,5*i)
    t.circle(x-i*0.75)
    t.end_fill()
    t.left(90)
    move(0.75)
    t.right(90)

