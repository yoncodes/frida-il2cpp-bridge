namespace Il2Cpp {
    @recycle
    export class Image extends NativeStruct {
        /** Gets the assembly in which the current image is defined. */
        @lazy
        get assembly(): Il2Cpp.Assembly {
            return new Il2Cpp.Assembly(Il2Cpp.exports.imageGetAssembly(this));
        }

        /** Gets the amount of classes defined in this image. */
        @lazy
        get classCount(): number {
            if (Il2Cpp.unityVersionIsBelow201830) {
                return this.classes.length;
            } else {
                return Il2Cpp.exports.imageGetClassCount(this);
            }
        }

        /** Gets the classes defined in this image. */
        @lazy
get classes(): Il2Cpp.Class[] {
    try {
        if (Il2Cpp.unityVersionIsBelow201830) {
            const types = this.assembly.object.method<Il2Cpp.Array<Il2Cpp.Object>>("GetTypes").invoke(false);

            if (!types) {
                console.error("Failed to retrieve types from assembly.");
                return [];
            }

            const classes = globalThis.Array.from(types, obj => {
                try {
                    if (!obj || obj.isNull()) {
                        throw new Error("Null or invalid Il2Cpp.Object detected.");
                    }

                    const classPointer = Il2Cpp.exports.classFromObject(obj);
                    if (!classPointer || classPointer.isNull()) {
                        throw new Error("Failed to get class pointer from object.");
                    }

                    return new Il2Cpp.Class(classPointer);
                } catch (error) {
                    console.warn("Error processing class from object:", error);
                    return null; // Filter out problematic objects
                }
            }).filter((klass): klass is Il2Cpp.Class => klass !== null);

            classes.unshift(this.class("<Module>"));
            return classes;
        } else {
            const classes = globalThis.Array.from(globalThis.Array(this.classCount), (_, i) => {
                try {
                    const classPointer = Il2Cpp.exports.imageGetClass(this, i);
                    if (!classPointer || classPointer.isNull()) {
                        throw new Error(`Invalid class pointer at index ${i}.`);
                    }

                    return new Il2Cpp.Class(classPointer);
                } catch (error) {
                    console.warn(`Error processing class at index ${i}:`, error);
                    return null; // Filter out problematic indices
                }
            });

            return classes.filter((klass): klass is Il2Cpp.Class => klass !== null);
        }
    } catch (error) {
        console.error("Error retrieving classes:", error);
        return [];
    }
}

        

        
        /** Gets the name of this image. */
        @lazy
        get name(): string {
            return Il2Cpp.exports.imageGetName(this).readUtf8String()!;
        }

        /** Gets the class with the specified name defined in this image. */
        class(name: string): Il2Cpp.Class {
            return this.tryClass(name) ?? raise(`couldn't find class ${name} in assembly ${this.name}`);
        }

        /** Gets the class with the specified name defined in this image. */
        tryClass(name: string): Il2Cpp.Class | null {
            const dotIndex = name.lastIndexOf(".");
            const classNamespace = Memory.allocUtf8String(dotIndex == -1 ? "" : name.slice(0, dotIndex));
            const className = Memory.allocUtf8String(name.slice(dotIndex + 1));

            return new Il2Cpp.Class(Il2Cpp.exports.classFromName(this, classNamespace, className)).asNullable();
        }
    }

    /** Gets the COR library. */
    export declare const corlib: Il2Cpp.Image;
    // prettier-ignore
    getter(Il2Cpp, "corlib", () => {
        return new Il2Cpp.Image(Il2Cpp.exports.getCorlib());
    }, lazy);
}
