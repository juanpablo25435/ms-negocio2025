import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/spares", "SparesController.find");
    Route.get("/spares/:id", "SparesController.find");
    Route.post("/spares", "SparesController.create");
    Route.put("/spares/:id", "SparesController.update");
    Route.delete("/spares/:id", "SparesController.delete");
})