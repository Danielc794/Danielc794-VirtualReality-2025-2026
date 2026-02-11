import os

# If no X display is present, try to start a virtual one so turtle/Tk
# can create a canvas in headless environments.
_started_display = False
_display = None
if os.environ.get("DISPLAY", "") == "" or os.environ.get("HEADLESS", "") == "1":
  try:
    from pyvirtualdisplay import Display
    _display = Display(visible=0, size=(1024, 768))
    _display.start()
    _started_display = True
  except Exception:
    # fallback: continue and let turtle raise if display is required
    _started_display = False

import func
# initialize turtle objects now that a display is (likely) available
func.init_turtle()

# expose helpers locally (keeps rest of file unchanged)
jump = func.jump
curve1 = func.curve1
curve2 = func.curve2
circles = func.circles
circles2 = func.circles2
stars1 = func.stars1
comet = func.comet
home = func.home
turtle = func.turtle
t = func.t

#t.speed(0)
turtle.tracer(0)

#Rectangle
jump(-500,-300)
t.width(2)
t.begin_fill()
for i in range(2):
  t.forward(1000)
  t.left(90)
  t.forward(600)
  t.left(90)
t.end_fill()

#Earth Glow
for i in range(20):
  jump(-500,-300+5*i)
  t.pencolor(100-5*i,100-5*i,100-5*i)
  t.begin_fill()
  t.fillcolor(100-5*i,100-5*i,100-5*i)
  curve1()
  t.left(139.5)
  t.forward(5)
  t.left(90)
  curve2()
  t.left(40.5)
  t.forward(5)
  t.end_fill()
  home()

#Moon Glow
jump(-300,75.5)
circles2(100)

#stars
stars1()
home()
jump(-500,-300)

#earth
jump(-500,-300)
t.pencolor(42,119,219)
t.begin_fill()
t.fillcolor(42,119,219)
curve1()
t.goto(-500,-300)
t.end_fill()
home()

#comet1
home()
jump(450,100)
t.left(170)
comet()
#comet2
home()
jump(250,300)
t.right(160)
comet()
#comet3
home()
jump(150,50)
t.left(175)
comet()

#Moon
home()
jump(-300,100)
t.pencolor(200,200,200)
t.begin_fill()
t.fillcolor(200,200,200)
t.circle(75)
t.end_fill()

#Moo nCircles
jump(-320,120)
circles(10)
jump(-355,150)
circles(7)
jump(-280,115)
circles(6)
jump(-290,160)
circles(7.5)
jump(-250,130)
circles(11)
jump(-330,170)
circles(13)
jump(-260,180)
circles(8)
jump(-295,210)
circles(14)
jump(-335,215)
circles(6)

#land1
home()
jump(-500,-300)
t.pencolor(28,166,40)
t.begin_fill()
t.fillcolor(28,166,40)
t.width(2)
t.left(50)
for i in range(30):
  t.right(0.5)
  t.forward(5.71)
  
for i in range(13):
  t.right(1)
  t.forward(7)
  
for i in range(100):
  t.right(2)
  t.forward(1)

t.left(20)
for i in range(42):
  t.left(3)
  t.forward(2)

for i in range(25):
  t.left(0.5)
  t.forward(3.2)

t.goto(-500,-300)
t.end_fill()

#Land2
home()
jump(-120,-300)
t.begin_fill()
t.fillcolor(28,166,40)
t.left(130)
for i in range(29):
  t.forward(3.5)
  t.right(3)

for i in range(15):
  t.left(4.3)
  t.forward(5)

for i in range(100):
  t.forward(1)
  t.right(2)

for i in range(37):
  t.forward(3)
  t.left(4)

for i in range(30):
  t.forward(2)
  t.right(4)

for i in range(39):
  t.forward(4)
  t.left(1)

for i in range(15):
  t.forward(2.8)
  t.right(3)

t.goto(-120,-300)
t.end_fill()

#Land3
home()
jump(500,-300)
t.begin_fill()
t.fillcolor(28,166,40)
t.right(230)
for i in range(50):
  t.left(0.5)
  t.forward(5.71)

for i in range(37):
  t.left(2)
  t.forward(1.5)

for i in range(27):
  t.left(4)
  t.forward(3)

for i in range(25):
  t.right(3)
  t.forward(2)

for i in range(11):
  t.forward(4.9)
  t.left(4)

t.goto(500,-300)
t.end_fill()

screen = turtle.Screen()
ts = t.getscreen()
ts.getcanvas().postscript(file="drawing.eps")

# If we started a virtual display, stop it now.
if _started_display and _display is not None:
  try:
    _display.stop()
  except Exception:
    pass