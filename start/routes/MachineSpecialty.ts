import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/machine_specialties", "MachineSpecialtiesController.find");
    Route.get("/machine_Specialties/:id", "MachineSpecialtiesController.find");
    Route.post("/machine_specialties", "MachineSpecialtiesController.create");
    Route.put("/machine_specialties/:id", "MachineSpecialtiesController.update");
    Route.delete("/machine_specialties/:id", "MachineSpecialtiesController.delete");
})