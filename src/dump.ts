namespace Il2Cpp {
    /**
     * Dumps the application, i.e. it creates a dummy `.cs` file that contains
     * all the class, field and method declarations.
     *
     * The dump is very useful when it comes to inspecting the application as
     * you can easily search for succulent members using a simple text search,
     * hence this is typically the very first thing it should be done when
     * working with a new application. \
     * Keep in mind the dump is version, platform and arch dependentend, so
     * it has to be re-genereated if any of these changes.
     *
     * The file is generated in the **target** device, so you might need to
     * pull it to the host device afterwards.
     *
     * Dumping *may* require a file name and a directory path (a place where the
     * application can write to). If not provided, the target path is generated
     * automatically using the information from {@link Il2Cpp.application}.
     *
     * ```ts
     * Il2Cpp.perform(() => {
     *     Il2Cpp.dump();
     * });
     * ```
     *
     * For instance, the dump resembles the following:
     * ```
     * class Mono.DataConverter.PackContext : System.Object
     * {
     *     System.Byte[] buffer; // 0x10
     *     System.Int32 next; // 0x18
     *     System.String description; // 0x20
     *     System.Int32 i; // 0x28
     *     Mono.DataConverter conv; // 0x30
     *     System.Int32 repeat; // 0x38
     *     System.Int32 align; // 0x3c
     *
     *     System.Void Add(System.Byte[] group); // 0x012ef4f0
     *     System.Byte[] Get(); // 0x012ef6ec
     *     System.Void .ctor(); // 0x012ef78c
     *   }
     * ```
     */
    const FIELD_ATTRIBUTE_FIELD_ACCESS_MASK  = 0x0007;
    const FIELD_ATTRIBUTE_STATIC = 0x0010;
    const FIELD_ATTRIBUTE_INIT_ONLY = 0x0020; // readonly
    const FIELD_ATTRIBUTE_LITERAL = 0x0040; // const
    const FIELD_ATTRIBUTE_PRIVATE = 0x0001;
    const FIELD_ATTRIBUTE_FAMILY = 0x0004;
    const FIELD_ATTRIBUTE_ASSEMBLY = 0x0003;
    const FIELD_ATTRIBUTE_PUBLIC = 0x0006;
    const METHOD_ATTRIBUTE_FAM_AND_ASSEM = 0x0002;
    const METHOD_ATTRIBUTE_STATIC = 0x0010;
    const METHOD_ATTRIBUTE_FAM_OR_ASSEM  = 0x0005;
    const METHOD_ATTRIBUTE_FINAL = 0x0020;
    const METHOD_ATTRIBUTE_VIRTUAL = 0x0040;
    const METHOD_ATTRIBUTE_ABSTRACT = 0x0400;
    const METHOD_ATTRIBUTE_PUBLIC = 0x0006;
    const METHOD_ATTRIBUTE_PRIVATE = 0x0001;
    const METHOD_ATTRIBUTE_FAMILY = 0x0004;
    const METHOD_ATTRIBUTE_ASSEMBLY = 0x0003;
    const TYPE_ATTRIBUTE_PUBLIC = 0x00000001;
    const TYPE_ATTRIBUTE_ABSTRACT = 0x00000080;
    const TYPE_ATTRIBUTE_SEALED = 0x00000100;
    const TYPE_ATTRIBUTE_INTERFACE = 0x00000020;
    const TYPE_ATTRIBUTE_CLASS_SEMANTIC_MASK = 0x00000020; // Used to check if it's an interface
    const TYPE_ATTRIBUTE_VISIBILITY_MASK = 0x00000007;
    const TYPE_ATTRIBUTE_NESTED_PUBLIC = 0x00000002;
    const TYPE_ATTRIBUTE_NESTED_PRIVATE = 0x00000003;
    const TYPE_ATTRIBUTE_NESTED_FAMILY = 0x00000004;
    const TYPE_ATTRIBUTE_NESTED_ASSEMBLY = 0x00000005;
    const TYPE_ATTRIBUTE_NESTED_FAM_AND_ASSEM = 0x00000006;
    const TYPE_ATTRIBUTE_NESTED_FAM_OR_ASSEM = 0x00000007;
    const PROPERTY_ATTRIBUTE_SPECIAL_NAME = 0x0200; // Indicates a special property (e.g., indexers)
    const PROPERTY_ATTRIBUTE_HAS_DEFAULT = 0x1000; // Indicates the property has a default value
    
    const METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK = 0x0007; // Visibility mask
     

    function get_field_modifiers(flags: any) {
        
    
        let modifiers = [];
    
        if (flags & FIELD_ATTRIBUTE_STATIC) modifiers.push("static");
        if (flags & FIELD_ATTRIBUTE_INIT_ONLY) modifiers.push("readonly");
        if (flags & FIELD_ATTRIBUTE_LITERAL) modifiers.push("const");
    
        const access = flags & FIELD_ATTRIBUTE_FIELD_ACCESS_MASK;
        switch (access) {
            case FIELD_ATTRIBUTE_PUBLIC:
                modifiers.push("public");
                break;
            case FIELD_ATTRIBUTE_FAMILY:
                modifiers.push("protected");
                break;
            case FIELD_ATTRIBUTE_ASSEMBLY:
                modifiers.push("internal");
                break;
            default:
                modifiers.push("private");
        }
    
        return modifiers.join(" ");
    }
    
    
    
    
    function get_method_modifiers(flags: any) {
        
    
        let modifiers = [];
    
        if (flags & METHOD_ATTRIBUTE_STATIC) modifiers.push("static");
        if (flags & METHOD_ATTRIBUTE_FINAL) modifiers.push("final");
        if (flags & METHOD_ATTRIBUTE_VIRTUAL) modifiers.push("virtual");
        if (flags & METHOD_ATTRIBUTE_ABSTRACT) modifiers.push("abstract");
    
        const access = flags & METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK;
        switch (access) {
            case METHOD_ATTRIBUTE_PUBLIC:
                modifiers.push("public");
                break;
            case METHOD_ATTRIBUTE_FAMILY:
                modifiers.push("protected");
                break;
            case METHOD_ATTRIBUTE_ASSEMBLY:
                modifiers.push("internal");
                break;
            default:
                modifiers.push("private");
        }
    
        return modifiers.join(" ");
    }
    
    
    function get_class_modifiers(flags: any) {
        
    
        const modifiers = [];
    
        // Determine visibility
        const visibility = flags & TYPE_ATTRIBUTE_VISIBILITY_MASK;
        switch (visibility) {
            case TYPE_ATTRIBUTE_PUBLIC:
                modifiers.push("public");
                break;
            case TYPE_ATTRIBUTE_NESTED_PUBLIC:
                modifiers.push("public");
                break;
            case TYPE_ATTRIBUTE_NESTED_PRIVATE:
                modifiers.push("private");
                break;
            case TYPE_ATTRIBUTE_NESTED_FAMILY:
                modifiers.push("protected");
                break;
            case TYPE_ATTRIBUTE_NESTED_ASSEMBLY:
                modifiers.push("internal");
                break;
            case TYPE_ATTRIBUTE_NESTED_FAM_AND_ASSEM:
                modifiers.push("protected internal");
                break;
            case TYPE_ATTRIBUTE_NESTED_FAM_OR_ASSEM:
                modifiers.push("private protected");
                break;
            default:
                modifiers.push("private");
        }
    
        // Check for interface
        const isInterface = (flags & TYPE_ATTRIBUTE_CLASS_SEMANTIC_MASK) === TYPE_ATTRIBUTE_INTERFACE;
    
        // Handle abstract, sealed, and static classes
        if (!isInterface) {
            if ((flags & TYPE_ATTRIBUTE_ABSTRACT) && (flags & TYPE_ATTRIBUTE_SEALED)) {
                modifiers.push("static");
            } else {
                if (flags & TYPE_ATTRIBUTE_ABSTRACT) modifiers.push("abstract");
                if (flags & TYPE_ATTRIBUTE_SEALED) modifiers.push("sealed");
            }
        }
    
        if (isInterface) {
            modifiers.push("interface");
        }
    
        return modifiers.join(" ");
    }
    
    
    function get_class_type(klass: Il2Cpp.Class): string {
        if (klass.isInterface) return "interface";
        if (klass.isEnum) return "enum";
        return "class";
    }
    
    
    function get_class_attributes(flags: number): string[] {
        const TYPE_ATTRIBUTE_SERIALIZABLE = 0x00002000; // Adjust this value if needed
        const attributes: string[] = [];
        if (flags & TYPE_ATTRIBUTE_SERIALIZABLE) {
            attributes.push("[Serializable]");
        }
        return attributes;
    }
    
    
    
    function get_property_modifiers(getter?: Il2Cpp.Method, setter?: Il2Cpp.Method): string {
        const modifiers = new Set<string>();
    
        // Determine visibility
        const methodVisibility = (method?: Il2Cpp.Method): string => {
            if (!method || method.flags === undefined) return "private";
            if (method.flags & METHOD_ATTRIBUTE_PUBLIC) return "public";
            if (method.flags & METHOD_ATTRIBUTE_FAMILY) return "protected";
            if (method.flags & METHOD_ATTRIBUTE_ASSEMBLY) return "internal";
            return "private";
        };
    
        // Add visibility from getter and setter (whichever is higher visibility)
        modifiers.add(methodVisibility(getter));
        modifiers.add(methodVisibility(setter));
    
        // Check if static (either getter or setter being static is sufficient)
        if ((getter && getter.flags !== undefined && getter.flags & METHOD_ATTRIBUTE_STATIC) ||
            (setter && setter.flags !== undefined && setter.flags & METHOD_ATTRIBUTE_STATIC)) {
            modifiers.add("static");
        }
    
        return [...modifiers].join(" ");
    }
    
    

    function get_generic_parameters(klass: Il2Cpp.Class): string[] | null {
        // Check if the class is generic
        if (!klass.isGeneric) return null;
    
        // Retrieve generic parameters
        const genericParams: string[] = klass.generics.map(genericClass => genericClass.name);
    
        return genericParams;
    }
    

    export function dump(fileName?: string, path?: string): void {
        const startTimer = Date.now();
    
        const ActivityThread = Java.use("android.app.ActivityThread");
        const appContext = ActivityThread.currentApplication().getApplicationContext();
        let privateDir = appContext.getFilesDir().getAbsolutePath();
    
        if (privateDir.startsWith("/data/user/0/")) {
            privateDir = privateDir.replace("/data/user/0/", "/data/data/");
        }
    
        fileName = fileName ?? `${Il2Cpp.application.identifier ?? "unknown"}_${Il2Cpp.application.version ?? "unknown"}.cs`;
        const destination = `${path ?? privateDir}/${fileName}`;
        const file = new File(destination, "w");
    
        console.log(`Starting dump to ${destination}...`);
    
        Il2Cpp.domain.assemblies.forEach((assembly, index) => {
            file.write(`// Image ${index}: ${assembly.name}\n`);
        });
        file.write("\n");
    
        Il2Cpp.domain.assemblies.forEach((assembly) => {
            assembly.image.classes.forEach((klass) => {
                try {
                    console.log(`Processing Class: ${buildClassHierarchy(klass)}`);
    
                    const modifiers = get_class_modifiers(klass.flags);
                    const attributes = get_class_attributes(klass.flags).join(" ");
                    const type = get_class_type(klass);
                    const generics = get_generic_parameters(klass)?.join(", ");
    
                    file.write(`// Dll : ${assembly.name}\n`);
                    file.write(`// Namespace: ${klass.namespace ?? ""}\n`);
                    if (attributes) file.write(`${attributes}\n`);
                    file.write(`${modifiers} ${type} ${klass.name}${generics ? `<${generics}>` : ""} {\n`);
    
                    file.write("\n\t// Fields\n");
                    klass.fields?.forEach((field) => {
                        const fieldModifiers = get_field_modifiers(field.flags);
                        file.write(`\t${fieldModifiers} ${field.type?.name ?? "unknown"} ${field.name}; // 0x${field.offset?.toString(16) ?? "unknown"}\n`);
                    });
    
                    file.write("\n\t// Properties\n");
                    const properties = klass.methods?.filter((method) => method.name.startsWith("get_") || method.name.startsWith("set_")) ?? [];
                    const propertyNames = new Set(properties.map((prop) => prop.name.substring(4)));
                    propertyNames.forEach((propertyName) => {
                        const getter = klass.methods.find((m) => m.name === `get_${propertyName}`);
                        const setter = klass.methods.find((m) => m.name === `set_${propertyName}`);
                        const propertyType = getter?.returnType?.name || setter?.parameters?.[0]?.type?.name || "unknown";
                        const propertyModifiers = get_property_modifiers(getter, setter);
                        file.write(`\t${propertyModifiers} ${propertyType} ${propertyName} { ${getter ? "get;" : ""} ${setter ? "set;" : ""} }\n`);
                    });
    
                    file.write("\n\t// Methods\n");
                    klass.methods?.forEach((method) => {
                        if (method.relativeVirtualAddress?.toString(16).startsWith("fff")) return;
    
                        const methodModifiers = get_method_modifiers(method.flags);
                        const parameters = method.parameters?.map((param) => `${param.type?.name ?? "unknown"} ${param.name}`).join(", ") || "";
                        file.write(`\t${methodModifiers} ${method.returnType?.name ?? "unknown"} ${method.name}(${parameters}); // RVA: 0x${method.relativeVirtualAddress?.toString(16) ?? "unknown"}\n`);
                    });
    
                    file.write("}\n\n");
                } catch (error) {
                    console.error(`Error processing class: ${klass.name}`, error);
                }
            });
        });
    
        file.flush();
        file.close();
        
        console.log(`Dumped saved to: ${destination}`);
        const endTimer = Date.now();
        console.log(`Dump completed. Took ${(endTimer - startTimer) / 1000} seconds.`);
    }
    
    
    /**
     * Builds the full hierarchical class name, including namespace and nested classes,
     * separated by "$$".
     */
    function buildClassHierarchy(klass: Il2Cpp.Class): string {
        let hierarchy = klass.name;
        let parentClass = klass.declaringClass;
    
        // Traverse up the nested hierarchy
        while (parentClass) {
            hierarchy = `${parentClass.name}$$${hierarchy}`;
            parentClass = parentClass.declaringClass;
        }
    
        // Prepend the namespace if available
        if (klass.namespace) {
            hierarchy = `${klass.namespace}$$${hierarchy}`;
        }
    
        return hierarchy;
    }
    
    
    
    
    

    /**
     * Just like {@link Il2Cpp.dump}, but a `.cs` file per assembly is
     * generated instead of having a single big `.cs` file. For instance, all
     * classes within `System.Core` and `System.Runtime.CompilerServices.Unsafe`
     * are dumped into `System/Core.cs` and
     * `System/Runtime/CompilerServices/Unsafe.cs`, respectively.
     * 
     * ```ts
     * Il2Cpp.perform(() => {
     *     Il2Cpp.dumpTree();
     * });
     * ```
     */
    export function dumpTree(path?: string, ignoreAlreadyExistingDirectory: boolean = false): void {
        path = path ?? `${Il2Cpp.application.dataPath!}/${Il2Cpp.application.identifier ?? "unknown"}_${Il2Cpp.application.version ?? "unknown"}`;

        if (!ignoreAlreadyExistingDirectory && directoryExists(path)) {
            raise(`directory ${path} already exists - pass ignoreAlreadyExistingDirectory = true to skip this check`);
        }

        for (const assembly of Il2Cpp.domain.assemblies) {
            inform(`dumping ${assembly.name}...`);

            const destination = `${path}/${assembly.name.replaceAll(".", "/")}.cs`;

            createDirectoryRecursively(destination.substring(0, destination.lastIndexOf("/")));

            const file = new File(destination, "w");

            for (const klass of assembly.image.classes) {
                file.write(`${klass}\n\n`);
            }

            file.flush();
            file.close();            
        }

        ok(`dump saved to ${path}`);
    }

    function directoryExists(path: string): boolean {
        return Il2Cpp.corlib.class("System.IO.Directory").method<boolean>("Exists").invoke(Il2Cpp.string(path));
    }

    function createDirectoryRecursively(path: string) {
        Il2Cpp.corlib.class("System.IO.Directory").method("CreateDirectory").invoke(Il2Cpp.string(path));
    }
}
