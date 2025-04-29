import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/shifts", "ShiftsController.find");
    Route.get("/shifts/:id", "ShiftsController.find");
    Route.post("/shifts", "ShiftsController.create");
    Route.put("/shifts/:id", "ShiftsController.update");
    Route.delete("/shifts/:id", "ShiftsController.delete");
})