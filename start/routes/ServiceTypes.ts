import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/service_types", "ServiceTypesController.find");
    Route.get("/service_types/:id", "ServiceTypesController.find");
    Route.post("/service_types", "ServiceTypesController.create");
    Route.put("/service_types/:id", "ServiceTypesController.update");
    Route.delete("/service_types/:id", "ServiceTypesController.delete");
})