/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import './routes/Departments'
import './routes/Machine'
import './routes/Operator'
import './routes/Evidence'
import './routes/Work'
import './routes/WorkMunicipality'
import './routes/User'
import './routes/Specialty'
import './routes/SpareProcedure'
import './routes/Spare'
import './routes/Shift'
import './routes/ServiceType'
import './routes/Service'
import './routes/Procedure'
import './routes/Policy'
import './routes/OperatorSpecialty'
import './routes/Novelty'
import './routes/Municipalty'
import './routes/Message'
import './routes/MaintenanceProcedure'
import './routes/Maintenance'
import './routes/MachineSpecialty'
import './routes/Invoice'
import './routes/Insurance'
import './routes/Gps'
import './routes/Governor'
import './routes/Fee'
import './routes/ComboMachine'
import './routes/Combo'
import './routes/Chat'