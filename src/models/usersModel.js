const Pool = require('../config/db')

const selectUsers = () => {
    return Pool.query(
      `SELECT * FROM users WHERE deleted_at IS NULL`
    );
  };

const insertUsers = data => {
  console.log(data)
  return Pool.query(
    `INSERT INTO users(name) VALUES('${data}')`
  );
}
const selectUsersById = (data) => {
  return new Promise((resolve,reject)=>
    Pool.query(`SELECT * FROM users WHERE id='${data}'`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
  }))
}
const selectUsersByName = (data) => {
  console.log(data)
  return Pool.query(
    `SELECT * FROM users WHERE name ='${data}'`
  );
}

const deleteUsersById = (data) => {
  console.log(data)
  let time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  return Pool.query(
    `UPDATE users SET deleted_at = '${time}' WHERE id = ${data};`
  );
}

const updateUsers = (id,name,email,photo) => {
  console.log(id)
  console.log(name,email,photo)
  return Pool.query(
    `UPDATE users SET name = '${name}',email = '${email}', photo = '${photo}' WHERE id = '${id}';`
  );
}

const findUser = (email) => {
  return new Promise((resolve,reject)=>
    Pool.query(`SELECT * FROM users WHERE email='${email}'`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
}

const createUser = (data) => {
  const {email,name,password,photo,id,otp,role} = data
  let time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  console.log(data)
  return new Promise((resolve,reject)=>
  Pool.query(`INSERT INTO users(id,email,name,password,created_at,OTP,role,photo) VALUES('${id}','${email}','${name}','${password}','${time}','${otp}','${role}','${photo}')`,(err,result)=>{
    if(!err){
      resolve(result)
    } else {
      reject(err)
    }
  }))
}

const verifyUser = (id) => {
  return Pool.query(
    `UPDATE users SET valid=1 WHERE id='${id}'`
  );
}

module.exports = {selectUsers,insertUsers,selectUsersById,selectUsersByName,deleteUsersById,updateUsers,findUser,createUser,verifyUser}