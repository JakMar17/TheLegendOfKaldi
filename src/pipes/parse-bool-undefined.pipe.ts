import { ArgumentMetadata, Injectable, ParseBoolPipe, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseBoolOrUndefinedPipe implements PipeTransform {
  
    constructor(private readonly parseBoolPipe: ParseBoolPipe) {}

    /**
     * Transforms the input value into a boolean or undefined.
     * 
     * @param value - The value to be transformed.
     * @param metadata - Additional metadata about the argument.
     * @returns A promise that resolves to a boolean or undefined.
     */
    transform(value: string | boolean | undefined, metadata: ArgumentMetadata): Promise<boolean | undefined> {
        return value ? this.parseBoolPipe.transform(value, metadata) : undefined;
  }
}