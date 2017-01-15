import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'textfilter',
    pure: false
})

export class TextFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        return items.filter(item => {
            let match = false;

            if (args[1].length === 0) {
                return items;
            }

            for (let i = 0; i < args[0].length; i++) {
                match = new RegExp(args[1], 'i').test(item[args[0][i]]);
               
                if (match) {
                    break;
                }
            }

            return match;
        });
    }
}