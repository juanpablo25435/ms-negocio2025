import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/invoice", "InvoicesController.find");
    Route.get("/invoice/:id", "InvoicesController.find");
    Route.post("/invoice", "InvoicesController.create");
    Route.put("/invoice/:id", "InvoicesController.update");
    Route.delete("/invoice/:id", "InvoicesController.delete");
})