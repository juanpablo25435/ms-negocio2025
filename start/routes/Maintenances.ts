import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/maintenances", "MaintenancesController.find");
    Route.get("/maintenances/:id", "MaintenancesController.find");
    Route.post("/maintenances", "MaintenancesController.create");
    Route.put("/maintenances/:id", "MaintenancesController.update");
    Route.delete("/maintenances/:id", "MaintenancesController.delete");
})