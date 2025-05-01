import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/procedures", "ProceduresController.find");
    Route.get("/procedures/:id", "ProceduresController.find");
    Route.post("/procedures", "ProceduresController.create");
    Route.put("/procedures/:id", "ProceduresController.update");
    Route.delete("/procedures/:id", "ProceduresController.delete");
})