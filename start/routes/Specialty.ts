import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/specialties", "SpecialtiesController.find");
    Route.get("/specialties/:id", "SpecialtiesController.find");
    Route.post("/specialties", "SpecialtiesController.create");
    Route.put("/specialties/:id", "SpecialtiesController.update");
    Route.delete("/specialties/:id", "SpecialtiesController.delete");
})