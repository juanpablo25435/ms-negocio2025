import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/novelties", "NoveltiesController.find");
    Route.get("/novelties/:id", "NoveltiesController.find");
    Route.post("/novelties", "NoveltiesController.create");
    Route.put("/novelties/:id", "NoveltiesController.update");
    Route.delete("/novelties/:id", "NoveltiesController.delete");
})