# frida-il2cpp-bridge


## Features

-   Dump classes, methods, fields and so on
-   Trace, intercept and replace method calls
-   Mess around with the C# runtime
-   Il2Cpp structs and global metadata (almost) free


### Dumps
- Modified the function to add more information
- Added a couple helper functions that should help with generic types

## Compatibility

#### Unity version

It should work for any Unity version in the range **5.3.0** - **2022.1.x**.

#### Platforms

**Android**, **Linux**, **Windows**, **iOS**, **macOS** are supported.
However, only Android and Linux are "tested": expect breakage if you are using another platform.


## Acknowledgements

Thanks to [vfsfitvnm](https://github.com/vfsfitvnm) for the original Il2cpp-frida-bridge

## Notes

Part of another Project I'm working on for a friend.