# foosball.io

`foosball.io` provides a webservice for foosball leagues interested in tracking game
statistics and running tournaments.

## Get Set Up

### Dependencies

`mkvirtualenv foosball`
`pip install -r requirements.txt`

### Setup your database

`python foosball.py db init`
`python foosball.py db upgrade`

### Run

To start your server use: `python foosball.py runserver`

## Deps

```
gem install sass
sass --watch static/scss
brew install phantomjs
```

![travis ci builid status](https://travis-ci.org/steder/foosball.io.png)
