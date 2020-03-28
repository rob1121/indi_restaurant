@component('mail::message')
# Inquiry
Hi {{ $admin->name }}

{{ $request->message }}

###### _This message came from the [Website](https://www.google.com)_

Thanks,<br>

## {{ $request->name }}<br>
Email: {{ $request->email }}<br>
Number: {{ $request->number }}
@endcomponent
