import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/maintenance_procedures", "MaintenanceProceduresController.find");
    Route.get("/maintenance_procedures/:id", "MaintenanceProceduresController.find");
    Route.post("/maintenance_procedures", "MaintenanceProceduresController.create");
    Route.put("/maintenance_procedures/:id", "MaintenanceProceduresController.update");
    Route.delete("/maintenance_procedures/:id", "MaintenanceProceduresController.delete");
})