**Needed requests**
- All promos sorted alphabetically by name


  `SELECT * FROM "promo" ORDER BY "name" ASC;`

- All students sorted alphabetically by last name

`SELECT * FROM "student" ORDER BY "last_name" ASC;`

- All students of promo 135
  
`SELECT * FROM "student" WHERE "promo_id"=135;`

- All students where first name or last name is like "max"

`SELECT * FROM "student" WHERE "first_name" LIKE '%max%' OR "last_name" LIKE '%max%';`

--------------

**All tests I did**
1. Callback
```js
const promosTesssst = client.query('SELECT * FROM "promo" LIMIT 2', (err, res) => {
  if(err) {
    return console.error('error occured:', err);
  } else {
    //console.log('CALLBACK!!!!!!!',res.rows);
  }
});
```

2. Promise test 1
```js
const promosTest = client
  .query('SELECT * FROM "promo" LIMIT 1')
  .then(function (res) {
    console.log('THEN:', res.rows);
    //const myPromosArray = res.rows;
    return res.rows;
  }) 
  .catch(err => console.error(err));
```

3. Promise test 2
```js
const promosTesteuh = client
  .query('SELECT * FROM "promo" LIMIT 1')
  .then(res => console.log(res.rows))
  .catch(err => console.error(err));

console.log('LIST1:', promosTest);
```
