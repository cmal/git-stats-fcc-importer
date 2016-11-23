# git-stats-fcc-importer

[git-stats](https://github.com/IonicaBizau/git-stats) is a tool for
localizing your git statistics, and generating a GitHub-like contributions calendars to visualize
your git statistics.

This repo is for [FreeCodeCamp](https://github.com/FreeCodeCamp/FreeCodeCamp/) users to import their
commits on [FreeCodeCamp website](https://www.freecodecamp.com) to keep the completeness of their git stats.


## Usage:

> $ npm i -g git-stats-fcc-importer

> $ git-stats-fcc-importer <YOUR-FCC-USERNAME>

> $ git-stats

## Example:

I want to import the stats of my FCC acount, which named `cmal`, so I

> $ npm i -g git-stats-fcc-importer

to install this package, and then use this command line tool:

> $ git-stats-fcc-importer cmal

If the API responses with correct data, then I can see my

## NOTE:

Please reconfirm your username, otherwise you may import another users' stats on FreeCodeCamp.
You may want to do this by trying access to this `about` API:
> https://www.freecodecamp.com/api/users/about?username=<YOUR-FCC-USERNAME>
of FreeCodeCamp, to check whether your brownie point to the username is
the same as yours.
