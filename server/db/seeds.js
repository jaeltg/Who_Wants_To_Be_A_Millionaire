use millionaires;
db.dropDatabase();

db.scores.insertMany([
    {
        "name": "Piotr Gryko",
        "score": 500000
    },
    {
        "name": "Pete Brodie",
        "score": 1000000
    }
])