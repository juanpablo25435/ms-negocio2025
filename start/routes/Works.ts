import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/works", "WorksController.find");
    Route.get("/works/:id", "WorksController.find");
    Route.post("/works", "WorksController.create");
    Route.put("/works/:id", "WorksController.update");
    Route.delete("/works/:id", "WorksController.delete");
})