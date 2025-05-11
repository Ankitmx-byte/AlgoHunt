// Python module content data
// Based on open source resources like Python.org and Real Python

export const getPythonModuleContent = (moduleId) => {
  const moduleContent = {
    // Python Introduction & Setup
    "py-mod-1": {
      id: "py-mod-1",
      title: "Python Introduction & Setup",
      content: [
        {
          type: "video",
          title: "Introduction to Python Programming",
          description: "A comprehensive introduction to Python programming language, its history, features, and why it's so popular among developers.",
          source: "freeCodeCamp.org",
          url: "https://www.youtube.com/embed/rfscVS0vtbw",
          duration: "4 hours 27 minutes",
          thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg"
        },
        {
          type: "text",
          title: "What is Python?",
          body: `
            <p>Python is a high-level, interpreted programming language known for its readability and simplicity. Created by Guido van Rossum and first released in 1991, Python has become one of the most popular programming languages in the world.</p>

            <p>Python's design philosophy emphasizes code readability with its notable use of significant whitespace. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.</p>

            <h4>Key Features of Python</h4>
            <ul>
              <li><strong>Easy to Learn and Use:</strong> Python has a simple, easy-to-learn syntax that emphasizes readability, reducing the cost of program maintenance.</li>
              <li><strong>Interpreted:</strong> Python is processed at runtime by the interpreter, meaning you don't need to compile your program before executing it.</li>
              <li><strong>High-Level:</strong> Python abstracts details of the computer from you, making it easier to focus on programming concepts rather than low-level details.</li>
              <li><strong>Cross-Platform:</strong> Python runs on many operating systems such as Windows, macOS, and various Linux/UNIX variants.</li>
              <li><strong>Versatile:</strong> Python is used in many different fields including web development, data science, artificial intelligence, scientific computing, automation, and more.</li>
            </ul>

            <h4>The Python Philosophy</h4>
            <p>Python's design philosophy is summarized in "The Zen of Python", accessible by typing <code>import this</code> in the Python interpreter:</p>

            <pre><code>Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!</code></pre>
          `
        },
        {
          type: "text",
          title: "Installing Python",
          body: `
            <p>Before you can start programming in Python, you need to install it on your computer. Here's how to do it on different operating systems:</p>

            <h4>Windows</h4>
            <ol>
              <li>Go to the official Python website at <a href="https://www.python.org/downloads/" target="_blank">python.org/downloads</a></li>
              <li>Click on the "Download Python" button (this will download the latest version)</li>
              <li>Run the installer file</li>
              <li>Make sure to check the box that says "Add Python to PATH" before clicking "Install Now"</li>
              <li>Follow the installation wizard to complete the installation</li>
            </ol>

            <h4>macOS</h4>
            <p>macOS comes with Python pre-installed, but it's usually an older version. To install the latest version:</p>
            <ol>
              <li>Go to the official Python website at <a href="https://www.python.org/downloads/" target="_blank">python.org/downloads</a></li>
              <li>Click on the "Download Python" button</li>
              <li>Run the installer package</li>
              <li>Follow the installation wizard to complete the installation</li>
            </ol>
            <p>Alternatively, if you use Homebrew, you can install Python with:</p>
            <pre><code>brew install python</code></pre>

            <h4>Linux</h4>
            <p>Most Linux distributions come with Python pre-installed. To check if Python is installed and which version you have, open a terminal and type:</p>
            <pre><code>python --version</code></pre>
            <p>or</p>
            <pre><code>python3 --version</code></pre>

            <p>If you need to install Python, you can use your distribution's package manager:</p>

            <p>For Ubuntu/Debian:</p>
            <pre><code>sudo apt update
sudo apt install python3 python3-pip</code></pre>

            <p>For Fedora:</p>
            <pre><code>sudo dnf install python3 python3-pip</code></pre>

            <p>For Arch Linux:</p>
            <pre><code>sudo pacman -S python python-pip</code></pre>

            <h4>Verifying Installation</h4>
            <p>To verify that Python was installed correctly, open a command prompt or terminal and type:</p>
            <pre><code>python --version</code></pre>
            <p>or</p>
            <pre><code>python3 --version</code></pre>

            <p>You should see the version number of the Python you installed.</p>
          `
        },
        {
          type: "text",
          title: "Python Development Environments",
          body: `
            <p>There are several ways to write and run Python code. Here are the most common options:</p>

            <h4>Python IDLE</h4>
            <p>IDLE (Integrated Development and Learning Environment) comes bundled with Python and is a simple IDE for beginners. It includes a Python shell window and a basic text editor.</p>
            <p>To open IDLE:</p>
            <ul>
              <li><strong>Windows:</strong> Search for "IDLE" in the Start menu</li>
              <li><strong>macOS:</strong> Find IDLE in your Applications folder or Launchpad</li>
              <li><strong>Linux:</strong> Type <code>idle</code> or <code>idle3</code> in the terminal</li>
            </ul>

            <h4>Text Editors and IDEs</h4>
            <p>For more advanced development, you might want to use a dedicated text editor or IDE:</p>
            <ul>
              <li><strong>Visual Studio Code:</strong> A free, open-source editor with excellent Python support through extensions</li>
              <li><strong>PyCharm:</strong> A powerful IDE specifically designed for Python (available in free Community and paid Professional editions)</li>
              <li><strong>Jupyter Notebook:</strong> An open-source web application that allows you to create and share documents containing live code, equations, visualizations, and narrative text</li>
              <li><strong>Spyder:</strong> A free IDE designed for scientific Python development</li>
              <li><strong>Atom:</strong> A hackable text editor with Python packages</li>
              <li><strong>Sublime Text:</strong> A sophisticated text editor with Python support</li>
            </ul>

            <h4>Online Python Environments</h4>
            <p>If you don't want to install anything, you can use online Python environments:</p>
            <ul>
              <li><strong>Replit:</strong> An online IDE that lets you code in Python directly in your browser</li>
              <li><strong>Google Colab:</strong> A free Jupyter notebook environment that requires no setup and runs in the cloud</li>
              <li><strong>Python.org Shell:</strong> A simple online Python shell available at <a href="https://www.python.org/shell/" target="_blank">python.org/shell</a></li>
            </ul>
          `
        },
        {
          type: "exercise",
          title: "Your First Python Program",
          description: "Let's write your first Python program - the classic 'Hello, World!' example.",
          instructions: [
            "Open your preferred Python environment (IDLE, text editor, or online environment)",
            "Create a new Python file named hello.py",
            "Write code to print 'Hello, World!' to the console",
            "Run the program to see the output"
          ],
          starterCode: `# This is a comment in Python
# Your first Python program

# Write your code below this line

`
        },
        {
          type: "quiz",
          title: "Python Introduction Quiz",
          description: "Test your understanding of Python basics with this quiz.",
          questions: [
            {
              id: "q1",
              text: "Who created Python?",
              options: [
                { id: "a", text: "Guido van Rossum" },
                { id: "b", text: "James Gosling" },
                { id: "c", text: "Bjarne Stroustrup" },
                { id: "d", text: "Rasmus Lerdorf" }
              ],
              correctAnswer: "a"
            },
            {
              id: "q2",
              text: "Which of the following is NOT a key feature of Python?",
              options: [
                { id: "a", text: "Easy to learn syntax" },
                { id: "b", text: "Interpreted language" },
                { id: "c", text: "Requires compilation before execution" },
                { id: "d", text: "Cross-platform compatibility" }
              ],
              correctAnswer: "c"
            },
            {
              id: "q3",
              text: "What command would you use to check your Python version in the terminal?",
              options: [
                { id: "a", text: "python --check" },
                { id: "b", text: "python --version" },
                { id: "c", text: "python --ver" },
                { id: "d", text: "python --info" }
              ],
              correctAnswer: "b"
            }
          ]
        }
      ]
    },

    // Python Syntax & Data Types
    "py-mod-2": {
      id: "py-mod-2",
      title: "Python Syntax & Data Types",
      content: [
        {
          type: "video",
          title: "Python Variables, Data Types, and Syntax",
          description: "Learn about Python variables, basic syntax, and the different data types available in Python with practical examples.",
          source: "Programming with Mosh",
          url: "https://www.youtube.com/embed/6yrsX752CWk",
          duration: "1 hour 10 minutes",
          thumbnail: "https://img.youtube.com/vi/6yrsX752CWk/maxresdefault.jpg"
        },
        {
          type: "text",
          title: "Python Syntax Basics",
          body: `
            <p>Python's syntax is designed to be readable and straightforward. Here are the basic elements of Python syntax:</p>

            <h4>Indentation</h4>
            <p>Unlike many programming languages that use braces <code>{}</code> to define blocks of code, Python uses indentation. This makes the code more readable but requires consistency.</p>

            <pre><code># Example of Python indentation
if True:
    print("This is indented")
    if True:
        print("This is further indented")
print("This is not indented")</code></pre>

            <p>The standard indentation is 4 spaces, although any consistent indentation will work.</p>

            <h4>Comments</h4>
            <p>Comments in Python start with the hash character <code>#</code> and extend to the end of the line.</p>

            <pre><code># This is a single-line comment

# This is a
# multi-line comment

"""
This is also a
multi-line comment (technically a docstring)
"""</code></pre>

            <h4>Statements</h4>
            <p>A statement in Python is a logical line of code that performs an action. Each statement typically goes on its own line.</p>

            <pre><code>x = 5  # This is a statement
print(x)  # This is another statement</code></pre>

            <p>You can put multiple statements on one line using semicolons, but this is generally discouraged for readability:</p>

            <pre><code>x = 5; print(x)  # Not recommended</code></pre>

            <h4>Line Continuation</h4>
            <p>If a statement is too long, you can continue it to the next line using a backslash <code>\\</code> or by using parentheses, brackets, or braces:</p>

            <pre><code># Using backslash
total = 1 + 2 + 3 + \\
        4 + 5 + 6

# Using parentheses (preferred)
total = (1 + 2 + 3 +
         4 + 5 + 6)</code></pre>

            <h4>Case Sensitivity</h4>
            <p>Python is case-sensitive, which means <code>variable</code> and <code>Variable</code> are different identifiers.</p>
          `
        },
        {
          type: "text",
          title: "Variables in Python",
          body: `
            <p>Variables in Python are used to store data values. Unlike some languages, you don't need to declare a variable's type before using it.</p>

            <h4>Variable Assignment</h4>
            <p>To create a variable in Python, you simply assign a value to a name:</p>

            <pre><code>name = "John"
age = 25
is_student = True</code></pre>

            <p>You can also assign multiple variables at once:</p>

            <pre><code>x, y, z = 1, 2, 3
a = b = c = 0  # All three variables get the value 0</code></pre>

            <h4>Variable Naming Rules</h4>
            <ul>
              <li>Variable names can contain letters, numbers, and underscores</li>
              <li>Variable names must start with a letter or underscore</li>
              <li>Variable names cannot start with a number</li>
              <li>Variable names are case-sensitive</li>
              <li>Variable names cannot be Python keywords (like <code>if</code>, <code>for</code>, <code>while</code>, etc.)</li>
            </ul>

            <h4>Variable Naming Conventions</h4>
            <p>While not enforced by the language, these conventions are widely followed:</p>
            <ul>
              <li>Use snake_case for variable names (words separated by underscores, all lowercase)</li>
              <li>Use UPPER_SNAKE_CASE for constants</li>
              <li>Use CamelCase for class names</li>
              <li>Use a single leading underscore for private variables (e.g., <code>_private_var</code>)</li>
              <li>Use a double leading underscore for strongly private variables (e.g., <code>__very_private</code>)</li>
            </ul>

            <h4>Dynamic Typing</h4>
            <p>Python is dynamically typed, which means you can reassign variables to different data types:</p>

            <pre><code>x = 5       # x is now an integer
x = "hello"  # x is now a string
x = [1, 2, 3]  # x is now a list</code></pre>
          `
        },
        {
          type: "text",
          title: "Python Data Types",
          body: `
            <p>Python has several built-in data types. Here are the most common ones:</p>

            <h4>Numeric Types</h4>
            <ul>
              <li><strong>int:</strong> Integer numbers (e.g., <code>5</code>, <code>-3</code>, <code>0</code>)</li>
              <li><strong>float:</strong> Floating-point numbers (e.g., <code>3.14</code>, <code>-0.001</code>, <code>2.0</code>)</li>
              <li><strong>complex:</strong> Complex numbers (e.g., <code>3+4j</code>)</li>
            </ul>

            <pre><code>a = 5       # int
b = 3.14    # float
c = 2 + 3j  # complex</code></pre>

            <h4>Text Type</h4>
            <ul>
              <li><strong>str:</strong> Strings (text) enclosed in single or double quotes</li>
            </ul>

            <pre><code>name = "John"
message = 'Hello, World!'
multiline = """This is a
multiline string"""</code></pre>

            <h4>Boolean Type</h4>
            <ul>
              <li><strong>bool:</strong> Boolean values (<code>True</code> or <code>False</code>)</li>
            </ul>

            <pre><code>is_active = True
is_complete = False</code></pre>

            <h4>Sequence Types</h4>
            <ul>
              <li><strong>list:</strong> Ordered, mutable collection (e.g., <code>[1, 2, 3]</code>)</li>
              <li><strong>tuple:</strong> Ordered, immutable collection (e.g., <code>(1, 2, 3)</code>)</li>
              <li><strong>range:</strong> Sequence of numbers (e.g., <code>range(6)</code> produces 0, 1, 2, 3, 4, 5)</li>
            </ul>

            <pre><code>my_list = [1, 2, 3, "hello"]  # list (mutable)
my_tuple = (1, 2, 3, "hello")  # tuple (immutable)
my_range = range(5)  # range (0, 1, 2, 3, 4)</code></pre>

            <h4>Mapping Type</h4>
            <ul>
              <li><strong>dict:</strong> Key-value pairs (e.g., <code>{"name": "John", "age": 30}</code>)</li>
            </ul>

            <pre><code>person = {
    "name": "John",
    "age": 30,
    "is_student": False
}</code></pre>

            <h4>Set Types</h4>
            <ul>
              <li><strong>set:</strong> Unordered collection of unique items (e.g., <code>{1, 2, 3}</code>)</li>
              <li><strong>frozenset:</strong> Immutable version of a set</li>
            </ul>

            <pre><code>my_set = {1, 2, 3, 3, 2}  # Will only contain {1, 2, 3}
my_frozen_set = frozenset([1, 2, 3])</code></pre>

            <h4>None Type</h4>
            <ul>
              <li><strong>NoneType:</strong> The <code>None</code> keyword represents the absence of a value</li>
            </ul>

            <pre><code>result = None</code></pre>

            <h4>Checking Types</h4>
            <p>You can check the type of a value using the <code>type()</code> function:</p>

            <pre><code>x = 5
print(type(x))  # <class 'int'>

y = "Hello"
print(type(y))  # <class 'str'>

z = [1, 2, 3]
print(type(z))  # <class 'list'></code></pre>

            <p>You can also check if a value is of a specific type using <code>isinstance()</code>:</p>

            <pre><code>x = 5
print(isinstance(x, int))  # True
print(isinstance(x, str))  # False</code></pre>
          `
        },
        {
          type: "exercise",
          title: "Working with Python Data Types",
          description: "Practice working with different data types in Python.",
          instructions: [
            "Create variables with different data types",
            "Perform operations with these variables",
            "Use string formatting to create a formatted string",
            "Print the results and the types of each variable"
          ],
          starterCode: `# 1. Create variables for a person's details
# Use appropriate variable names and data types


# 2. Create a list of hobbies


# 3. Create a dictionary that combines the person's details and hobbies


# 4. Use string formatting to create a summary of the person


# 5. Print the summary and the type of each variable

`
        },
        {
          type: "quiz",
          title: "Python Syntax & Data Types Quiz",
          description: "Test your understanding of Python syntax and data types.",
          questions: [
            {
              id: "q1",
              text: "Which of the following is NOT a valid variable name in Python?",
              options: [
                { id: "a", text: "my_var" },
                { id: "b", text: "_private" },
                { id: "c", text: "2variable" },
                { id: "d", text: "camelCase" }
              ],
              correctAnswer: "c"
            },
            {
              id: "q2",
              text: "What is the output of: type([1, 2, 3]).__name__",
              options: [
                { id: "a", text: "\"array\"" },
                { id: "b", text: "\"list\"" },
                { id: "c", text: "\"tuple\"" },
                { id: "d", text: "\"set\"" }
              ],
              correctAnswer: "b"
            },
            {
              id: "q3",
              text: "Which of the following data types is mutable in Python?",
              options: [
                { id: "a", text: "tuple" },
                { id: "b", text: "str" },
                { id: "c", text: "list" },
                { id: "d", text: "frozenset" }
              ],
              correctAnswer: "c"
            }
          ]
        }
      ]
    }
    // Additional modules would be defined here
  };

  return moduleContent[moduleId] || null;
};

export default getPythonModuleContent;
