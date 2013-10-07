# Fth-finance API documentation

## Finance Earnings

### Create

> POST /api/finance/earnings

> application/json

``` json
{
    "title": "Salary",
    "value": "2000"
}
```

< application/json

< 200

``` json
{
    "id": "52530ed51f1f2160d4000001",
    "message": [
        "earnings was added!"
    ],
    "status": true
}
```

### Update

> PUT /api/finance/earnings/52530ed51f1f2160d4000001

> application/json

``` json
{
    "value": "3000"
}
```

< application/json

< 200

``` json
{
    "message": [
        "earnings was updated!"
    ],
    "status": true
}
```

### Read

> GET /api/finance/earnings/52530ed51f1f2160d4000001

< application/json

< 200

``` json
{
    "result": {
        "title": "Salary",
        "value": 3000,
        "_id": "52530ed51f1f2160d4000001",
        "__v": 0
    },
    "message": [
        "earnings was readed!"
    ],
    "status": true
}
```

### Delete

> DELETE /api/finance/earnings/52530ed51f1f2160d4000001

< application/json

< 200

``` json
{
    "message": [
        "earnings was removed!"
    ],
    "status": true
}
```

## Finance Spendings

### Create

> POST /api/finance/spending

> application/json

``` json
{
    "title": "Credit card",
    "value": "1000"
}
```

< application/json

< 200

``` json
{
  "id": "525311ee1f1f2160d4000002",
  "message": [
    "spending was added!"
  ],
  "status": true
}
```

### Update

> PUT /api/finance/spending/525311ee1f1f2160d4000002

> application/json

``` json
{
    "value": "1200"
}
```

< application/json

< 200

``` json
{
    "message": [
        "spendings was updated!"
    ],
    "status": true
}
```

### Read

> GET /api/finance/spending/525311ee1f1f2160d4000002

< application/json

< 200

``` json
{
  "result": {
    "title": "Credit card",
    "value": 1200,
    "_id": "525311ee1f1f2160d4000002",
    "__v": 0
  },
  "message": [
    "spending was readed!"
  ],
  "status": true
}
```

### Delete

> DELETE /api/finance/spending/525311ee1f1f2160d4000002

< application/json

< 200

``` json
{
    "message": [
        "spendings was removed!"
    ],
    "status": true
}
```

## Finance Analysis

### Spending Overall

> GET /api/finance/analysis/spending/overall

< application/json

< 200

``` json
{
  "result": {
    "totalSpending": 1800
  },
  "message": [
    "overall was rendered!"
  ],
  "status": true
}
```
