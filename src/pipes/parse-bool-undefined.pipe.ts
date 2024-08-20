import { ArgumentMetadata, Injectable, ParseBoolPipe, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseBoolOrUndefinedPipe implements PipeTransform {
  
    constructor(private readonly parseBoolPipe: ParseBoolPipe) {}

    transform(value: string | boolean | undefined, metadata: ArgumentMetadata): Promise<boolean | undefined> {
        return value ? this.parseBoolPipe.transform(value, metadata) : undefined;
  }
}