import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/combo_machines", "ComboMachinesController.find");
    Route.get("/combo_machines/:id", "ComboMachinesController.find");
    Route.post("/combo_machines", "ComboMachinesController.create");
    Route.put("/combo_machines/:id", "ComboMachinesController.update");
    Route.delete("/combo_machines/:id", "ComboMachinesController.delete");
})