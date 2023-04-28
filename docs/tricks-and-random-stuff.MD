# Node and NPM
## NPM "ideal dependency tree"
An npm ideal dependency tree is a representation of the desired dependency tree for an npm package.
It specifies the versions of all the dependencies that an npm package should use, as well as the
versions of the dependencies of those dependencies, and so on. The ideal dependency tree ensures
that all the packages and their dependencies are compatible with each other, and that there are no
conflicts or duplicate dependencies.

When an npm package is installed, npm calculates an actual dependency tree based on the package's
dependencies and their dependencies. If the actual dependency tree doesn't match the ideal
dependency tree, npm may have to make compromises, such as installing multiple versions of the same
package or using older versions of packages that are no longer actively maintained.This can lead to
issues such as version conflicts, security vulnerabilities, and package bloat.

By specifying an ideal dependency tree, developers can ensure that their packages are always
installed with the correct dependencies and that the resulting packages are consistent and
maintainable.They can also use tools such as npm audit to check for security vulnerabilities and
other issues in their packages and their dependencies.

# Java

# Bash/Shell Script
## How to use `xargs`
`xargs` is so cool to use within your `bash` scripts, when piping/composing commands and one of them
does not play nice with this model.

`xargs` is a command line utility that allows you to pass the output of one command as arguments to
another command.

The basic syntax of `xargs` is:

``` bash
command1 | xargs command2
```
Here, `command1` is the command that produces output, and `command2` is the command that will be
executed with the output of `command1` as its arguments.

For example, let's say you have a list of file names that you want to delete. You can use the `ls`
command to list the files, and then use xargs to pass the file names to the rm command to delete
them:

``` bash
ls | xargs rm
```
This command will delete all the files in the current directory.

By default, `xargs` reads input from standard input (stdin) and separates the input into arguments
based on whitespace. However, you can also specify a different delimiter using the `-d` option.

For example, if you have a list of files separated by commas, you can use the -d option to tell
`xargs` to use a comma as the delimiter:

``` bash
echo "file1,file2,file3" | xargs -d',' rm
```

This command will delete the files file1, file2, and file3.

You can also use the -I option to specify a placeholder for the argument. The placeholder will be\
replaced with the input argument in the command that `xargs` executes.

For example, let's say you have a list of directories and you want to create a file called
`README.txt` in each directory. You can use the `-I` option to specify the directory name as a
placeholder:

``` bash
ls -d */ | xargs -I {} sh -c 'echo "This is the README file for directory {}" > {}/README.txt'
```

This command will create a README.txt file in each directory in the current directory.

There's a lot of ways to use and abuse this tool!

## How to use `sed`
`sed` is a powerful command line utility that is used for text processing and editing. It stands for
"stream editor", which means that it reads a text stream from standard input (or a file) and
performs editing operations on it. Here's a brief tutorial on how to use sed:

The basic syntax of sed is:

``` bash
sed [options] 'command' file(s)
```
Here, `options` are optional command line options that modify the behavior of sed, `command` is the
editing command that you want to perform on the input text, and `file`(s) are the input file(s) that
you want to process.

Here are some common sed commands:

### substitute (s): Replace a string in the input text with another string.

``` bash
sed 's/old/new/' input.txt
```
This command replaces the first occurrence of "old" in each line of `input.txt` with "new".

You can use different delimiters to separate the fields in the s command. For example, you can use a
colon as the delimiter instead of a slash:

``` bash
sed 's:old:new:' input.txt
```
You can also use the `g` option to replace all occurrences of the string in each line:

``` bash
sed 's/old/new/g' input.txt
```

### delete (d): Delete a line or a range of lines from the input text.

``` bashCopy code
sed '3d' input.txt
```
This command deletes the third line from input.txt.

You can also delete a range of lines by specifying a start and end line number:

``` bash
sed '2,5d' input.txt
```
This command deletes lines 2 to 5 from input.txt.

### print (p): Print lines that match a pattern.

``` bash
sed -n '/pattern/p' input.txt
```
This command prints all lines that contain the string "pattern" in input.txt.

The `-n` option tells sed to suppress the default output, and the p command tells it to print only
the lines that match the pattern.

### append (a): Append text after a line.

``` bash
sed '/pattern/a text to append' input.txt
```
This command finds the first line that contains "pattern" in `input.txt`, and appends "text to
append after it.

You can use the `i` command to insert text before a line, and the `c` command to replace a line with
text.

### read (r): Read a file and append its contents after a line.

``` bash
sed '/pattern/r file.txt' input.txt
```
This command finds the first line that contains "pattern" in `input.txt`, and appends the contents
of `file.txt` after it.

Note that the `r` command reads the contents of the file at the time of execution, so changes made
to `file.txt` after the sed command is executed will not be reflected in the output.

These are just a few examples of the many sed commands available. sed also supports regular
expressions, backreferences, and other advanced features for more complex text processing tasks.

On the same subject, **backreferences** are a powerful feature of `sed` that allow you to match and
replace patterns using the text captured by regular expressions. Here's an example of how to use
backreferences:

Let's say you have a file called `input.txt` with lines of text in the following format:

```
Firstname Lastname
```
And you want to swap the first and last names to get lines in the following format:

```
Lastname, Firstname
```
You can use `sed` with backreferences to achieve this. Here's the command:

``` bash
sed 's/\(.*\) \(.*\)/\2, \1/' input.txt
```
Let's break down the previous funky command:

- `s:` This specifies that we want to perform a substitution.
- `\(.*\):` This is a regular expression that matches any number of characters and captures it as a
group (denoted by the parentheses).
- `\(.*\):` This is another regular expression that matches any number of characters and captures it
as a group.
- `/\2, \1/:` This is the replacement string, which uses backreferences to swap the captured groups
and add a comma and space between them.
So, when sed encounters a line like `Firstname Lastname`, it captures "Firstname" and "Lastname" as
groups, and then replaces the line with "Lastname, Firstname".

Note that we use `\1` and `\2` to refer to the captured groups in the replacement string. `\1`
refers to the first captured group (i.e., the first name), and \2 refers to the second captured
group (i.e., the last name).

### Find and replace in all files

``` bash
#!/bin/bash

# Set the search string and replacement string
search="old_text"
replace="new_text"

# Find all files that contain the search string
files=$(grep -rl "$search" /path/to/search)

# Loop through the files and perform the replace operation
for file in $files; do
    sed -i "s/$search/$replace/g" "$file"
done
```

Here's how the script works:

The script sets the search and replace variables to the text to search for and replace with.

The `grep` command is used to find all files in the `/path/to/search directory` (and its 
subdirectories) that contain the search string. The `-r` option tells grep to search recursively,
and the `-l` option tells it to output only the names of the matching files.

The script loops through the files found by grep and uses the `sed` command to perform the find and
replace operation. The `-i` option tells sed to edit the file in place, and the `g` modifier at the
end of the `s` command tells it to replace all occurrences of the search string in each line.

Note that this script will replace all occurrences of the search string in all files that contain
it. If you want to limit the search to certain file types or directories, you can modify the grep
command accordingly.

## How to use `awk`
`awk` is a powerful command-line utility for text processing and manipulation. It is particularly
useful for working with structured data such as tabular data. Here's a brief tutorial on how to use
awk:

The basic syntax of awk is:

``` bash
awk '{ action }' file
```
Here, action is a set of commands or actions that you want to perform on each line of the input
file. The commands are enclosed in single quotes, and they are separated by semicolons if there is
more than one command.

For example, let's say you have a file called data.csv with the following contents:

``` bash
Alice,25,Female
Bob,35,Male
Charlie,40,Male
```
You can use awk to perform various operations on this data. Here are some common awk commands:

### Print (p): Print specific fields or the entire line.

```
awk '{ print $1 }' data.csv
```
This command prints the first field (i.e., the name) from each line of data.csv.

You can also print the entire line by omitting the field specifier:

```
awk '{ print }' data.csv
```
This command prints each line of data.csv.

### Sum (s): Calculate the sum of a column of numbers.

```
awk '{ sum += $2 } END { print sum }' data.csv
```
This command calculates the sum of the second field (i.e., the age) from each line of data.csv,
and prints the total at the end.

### Conditional (c): Select lines that match a condition.

```
awk '$3 == "Male" { print }' data.csv
```
This command selects only the lines of data.csv where the third field (i.e., the gender) is "Male",
and prints them.

### Pattern Matching (pm): Select lines that match a pattern.

```
awk '/Char/ { print }' data.csv
```
This command selects only the lines of data.csv that contain the string "Char" (i.e., the name
"Charlie"), and prints them.

### Delimiter (d): Specify the field delimiter.

```
awk -F ',' '{ print $3 }' data.csv
```
This command specifies that the field delimiter in data.csv is a comma, and prints the third field
(i.e., the gender) from each line.

These are just a few examples of the many awk commands available. awk also supports regular
expressions, user-defined functions, and other advanced features for more complex data processing
tasks. 

## Replace `foo` with `bar` in last command”

```
^foo^bar
```
If you did run a long command and you noticed that you made a mistake, to correct the command you can replace only the mistake by the correct word without the need to run the whole command again.

Another alternative to the above command is:

!!:gs/foo/bar
As opposed to ^foo^bar, which only replaces the first occurrence of foo, this one changes every occurrence
From: https://www.unixmen.com/10-great-and-powerful-linux-commands-you-may-need-to-know/

## Reuse the last item from the previous command with !$ 

Using the argument of the previous command comes in handy in many situations.
Say you have to create a directory and then go into the newly created directory. There you can use
the `!$` options. Recently I've been doing this a lot :p

## Empty a file without deleting it
Just do:

```
> filename
```

## Delete old/unused docker images (very destructive!!!)
``` bash
#!/bin/bash

# Set variables
IMAGES_TO_KEEP=10
DOCKER_IMAGE_IDS=$(docker images -q)
DOCKER_CONTAINER_IDS=$(docker ps -a -q)

# Delete unused containers
if [ ! -z "$DOCKER_CONTAINER_IDS" ]; then
    docker rm $DOCKER_CONTAINER_IDS
fi

# Delete old images
if [ ! -z "$DOCKER_IMAGE_IDS" ]; then
    IMAGE_COUNT=$(echo "$DOCKER_IMAGE_IDS" | wc -w)
    if (( $IMAGE_COUNT > $IMAGES_TO_KEEP )); then
        OLD_IMAGES=$(echo "$DOCKER_IMAGE_IDS" | tail -n +$(expr $IMAGES_TO_KEEP + 1))
        docker rmi $OLD_IMAGES
    fi
fi
```

## Rewriting Git History
Rewriting git history can be a powerful tool, but it should be used with caution as it can have significant consequences on the codebase and collaboration with other team members. Here are the general steps to rewrite git history:

Identify the commit(s) that you want to change or remove. You can use the git log command to view the commit history and identify the commit hash(es) that you want to modify.

Use the git rebase command with the -i option to start an interactive rebase session. This will allow you to modify the commit history.

``` bash
git rebase -i HEAD~N
```
In the above command, replace N with the number of commits you want to rewrite, starting from the current commit.

In the interactive rebase session, you can pick, edit, squash, or drop commits as needed. To modify a commit, change the command from "pick" to "edit" and save the file.

Use the `git commit --amend` command to make changes to the commit. Once you have made your changes, use the git rebase --continue command to proceed with the rebase.

Repeat steps 3 and 4 as needed until you have modified all the commits you want to change.

Finally, use the `git push --force` command to push the rewritten history to the remote repository. This will overwrite the existing history, so make sure you have communicated with your team members about the changes you have made.

It is important to note that rewriting git history can cause problems if others have already based their work on the original commits. Therefore, it is important to communicate with your team members before making any changes and consider whether the benefits of the rewrite outweigh the potential drawbacks.
