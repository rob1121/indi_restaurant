@component('mail::message')
Dear {{$request->name}},

Thank you for contacting {{$admin->name}}.

You will shortly receive a reply to your request with all the requested details.


@component('mail::button', ['url' =>  config('app.url')])
Visit Our Website
@endcomponent

###### _PS. Please do notreply to this email as this is autogenerated_

Thanks,<br>
[{{ $admin->name }}]({{ config('app.url') }})
@endcomponent