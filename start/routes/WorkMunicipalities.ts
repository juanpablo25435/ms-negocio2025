import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/work_municipalities", "WorkMunicipalitiesController.find");
    Route.get("/work_municipalities/:id", "WorkMunicipalitiesController.find");
    Route.post("/work_municipalities", "WorkMunicipalitiesController.create");
    Route.put("/work_municipalities/:id", "WorkMunicipalitiesController.update");
    Route.delete("/work_municipalities/:id", "WorkMunicipalitiesController.delete");
})