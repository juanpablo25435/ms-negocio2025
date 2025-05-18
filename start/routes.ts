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

import './routes/Chats'
import './routes/ComboMachines'
import './routes/Combos'
import './routes/Departments'
import './routes/Evidences'
import './routes/Fees'
import './routes/Governors'
import './routes/Gpss'
import './routes/Insurances'
import './routes/Invoices'
import './routes/Machines'
import './routes/MachineSpecialties'
import './routes/MaintenanceProcedures'
import './routes/Maintenances'
import './routes/Messages'
import './routes/Municipalities'
import './routes/Novelties'
import './routes/Operators'
import './routes/OperatorSpecialties'
import './routes/Policies'
import './routes/Procedures'
import './routes/Services'
import './routes/ServiceTypes'
import './routes/Shifts'
import './routes/SpareProcedures'
import './routes/Spares'
import './routes/Specialties'
import './routes/Users'
import './routes/WorkMunicipalities'
import './routes/Works'

