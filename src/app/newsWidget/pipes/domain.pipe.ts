import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
    name: 'domain'
})
export class DomainPipe implements PipeTransform {
    transform(value: string): string {
        if (!value || !_.isString(value)) {
            return value;
        }
        return value.replace(/^(https:(\/\/|\\\\))?(www\.)?(.*?)(\\|\/|$).*/gi, '$4');
    }
}
