import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/services_types", "ServiceTypesController.find");
    Route.get("/services_types/:id", "ServiceTypesController.find");
    Route.post("/services_types", "ServiceTypesController.create");
    Route.put("/services_types/:id", "ServiceTypesController.update");
    Route.delete("/services_types/:id", "ServiceTypesController.delete");
})