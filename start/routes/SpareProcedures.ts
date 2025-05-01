import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/spare_procedures", "SpareProceduresController.find");
    Route.get("/spare_procedures/:id", "SpareProceduresController.find");
    Route.post("/spare_procedures", "SpareProceduresController.create");
    Route.put("/spare_procedures/:id", "SpareProceduresController.update");
    Route.delete("/spare_procedures/:id", "SpareProceduresController.delete");
})