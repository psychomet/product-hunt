import { ChangeDetectorRef, Inject, inject, Pipe, PipeTransform } from '@angular/core';



import { GET_ACTIVE_CHANNEL_TOKEN, GetActiveChannelQuery } from '@bigi-shop/shared-util-types';

/**
 * Cache the resolved promise so that the activeChannel only needs
 * to be fetched once on the first invocation of the pipe.
 */
let channelDataPromise: Promise<any>;

/**
 * A pipe which formats a price (always given as an integer by Venure) according
 * to the currencyCode of the current Channel.
 */
@Pipe({
    name: 'formatPrice',
    pure: false,
})
export class FormatPricePipe implements PipeTransform {

    private latestValue: any = null;
    private latestReturnedValue: any = null;
    private changeDetector = inject(ChangeDetectorRef);
     private getActiveChannelToken =  inject(GET_ACTIVE_CHANNEL_TOKEN)

    transform(value: number) {
        if (this.latestValue !== value) {
            this.latestValue = value;
            this.formatCurrency(value);
        }
        return this.latestReturnedValue;
    }

    private formatCurrency(value: number) {
        this.getActiveChannel()
            .then(channel => {
                const formatter = Intl.NumberFormat(channel.defaultLanguageCode, {
                    style: 'currency',
                    currency: channel.currencyCode,
                });
                this.latestReturnedValue = formatter.format(value / 100);
                this.changeDetector.markForCheck();
            });
    }

    private getActiveChannel(): Promise<GetActiveChannelQuery['activeChannel']> {
        if (!channelDataPromise) {
            
            channelDataPromise = this.getActiveChannelToken.toPromise()
        }
        return channelDataPromise;
    }
}
