### EventGrid

We will use Eventgrid to send events when results have been written to
Blob Storage

```
Enable Event Grid resource provider
If you haven't previously used Event Grid in your Azure subscription, you may need to register the Event Grid resource provider.

In the Azure portal:

Select Subscriptions on the left menu.
Select the subscription you're using for Event Grid.
[On](On) the left menu, under Settings, select Resource providers.
Find Microsoft.EventGrid.
If not registered, select Register.
It may take a moment for the registration to finish. Select Refresh to update the status. When Status is Registered, you're ready to continue.

```
Links 

[EventGrid Blobs](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-event-overview#join-the-preview)
[Receiving-Events](https://docs.microsoft.com/en-us/azure/event-grid/receive-events)
