import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/operator_specialties", "OperatorSpecialtiesController.find");
    Route.get("/operator_Specialties/:id", "OperatorSpecialtiesController.find");
    Route.post("/operator_specialties", "OperatorSpecialtiesController.create");
    Route.put("/operator_specialties/:id", "OperatorSpecialtiesController.update");
    Route.delete("/operator_specialties/:id", "OperatorSpecialtiesController.delete");
})