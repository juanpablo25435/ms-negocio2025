import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/machines", "MachinesController.find");
    Route.get("/machines/:id", "MachinesController.find");
    Route.post("/machines", "MachinesController.create");
    Route.put("/machines/:id", "MachinesController.update");
    Route.delete("/machines/:id", "MachinesController.delete");
})