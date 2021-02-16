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

[BindingFunctions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-grid-trigger?tabs=javascript%2Cbash)
```
As multiple subscriptions can be configured to route events to the same event
handler, it is important not to assume events are from a particular source, but
to check the topic of the message to ensure that it comes from the storage
account you are expecting.
Similarly, check that the eventType is one you are prepared to process, and do
not assume that all events you receive will be the types you expect.
As messages can arrive after some delay, use the etag fields to understand if
your information about objects is still up-to-date. To learn how to use the etag
field, see Managing concurrency in Blob storage.
As messages can arrive out of order, use the sequencer fields to understand the
order of events on any particular object. The sequencer field is a string value
that represents the logical sequence of events for any particular blob name. You
can use standard string comparison to understand the relative sequence of two
events on the same blob name.
Storage events guarantees at-least-once delivery to subscribers, which ensures
that all messages are outputted. However due to retries or availability of
subscriptions, duplicate messages may occasionally occur. To learn more about
message delivery and retry, see Event Grid message delivery and retry.
Use the blobType field to understand what type of operations are allowed on the
blob, and which client library types you should use to access the blob. Valid
values are either BlockBlob or PageBlob.
Use the url field with the CloudBlockBlob and CloudAppendBlob constructors to
access the blob.
Ignore fields you don't understand. This practice will help keep you resilient
to new features that might be added in the future.
If you want to ensure that the Microsoft.Storage.BlobCreated event is triggered
only when a Block Blob is completely committed, filter the event for the
CopyBlob, PutBlob, PutBlockList or FlushWithClose REST API calls. These API
calls trigger the Microsoft.Storage.BlobCreated event only after data is fully
committed to a Block Blob. To learn how to create a filter, see Filter events
for Event Grid.
```
