# frida-il2cpp-bridge extended


## Features

-   Dump classes, methods, fields and so on
-   Trace, intercept and replace method calls
-   Mess around with the C# runtime
-   Il2Cpp structs and global metadata (almost) free


## Dumps
- Modified the function to add more information
- Added a couple helper functions that should help with generic types

## How to build

#### Step 1

clone the source

#### Step 2

extract and cd into the directory

#### Step 3

npm run build

#### Step 4

npm link

#### Step 5

cd to project folder & type npm link frida-il2cpp-bridge

#### Step 6

now you should be able to use our version of frida-il2cpp-bridge

## Compatibility

#### Unity version

It should work for any Unity version in the range **5.3.0** - **2022.1.x**.

#### Platforms

**Android**, **Linux**, **Windows**, **iOS**, **macOS** are supported.
However, only Android was "tested": expect breakage if you are using another platform. 


## Acknowledgements

Thanks to [vfsfitvnm](https://github.com/vfsfitvnm) for the original Il2cpp-frida-bridge

## Notes

Part of another Project I'm working on for a friend. [Frida Manager](https://github.com/yoncodes/frida_manager)

## Side Note

As of right now the dumps default path is data/data/com.package.name/files I original made this with android in mind.
