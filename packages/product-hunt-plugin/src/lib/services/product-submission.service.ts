import { Injectable } from '@nestjs/common';
import { TransactionalConnection, LanguageCode, ID } from '@vendure/core';
import { Product } from '@vendure/core/dist/entity/product/product.entity';
import { Customer } from '@vendure/core/dist/entity/customer/customer.entity';
import { ProductVariant } from '@vendure/core/dist/entity/product-variant/product-variant.entity';

@Injectable()
export class ProductSubmissionService {
  constructor(private connection: TransactionalConnection) {}

  async submitProduct(
    customer: Customer,
    input: {
      name: string;
      description: string;
      websiteUrl: string;
      makers: ID[];
      launchDate?: Date;
    }
  ): Promise<Product> {
    const product = new Product();

    // Create maker relations
    const makers = await this.connection
      .getRepository(Customer)
      .findByIds(input.makers);

    if (makers.length !== input.makers.length) {
      throw new Error('Some maker customers were not found');
    }

    // Only use custom fields for additional data
    product.customFields = {
      websiteUrl: input.websiteUrl,
      launchDate: input.launchDate,
      status: 'upcoming',
      upvotes: 0,
      makers: makers.map((maker) => maker.id),
    };

    // Create a default variant
    const variant = new ProductVariant();
    variant.sku = this.generateSku();
    variant.product = product;

    // Save the product and variant
    await this.connection.getRepository(Product).save(product);
    await this.connection.getRepository(ProductVariant).save(variant);

    // Add translations after saving to get the IDs
    await this.connection.getRepository(Product).update(product.id, {
      translations: [
        {
          id: product.id as ID,
          languageCode: LanguageCode.en,
          name: input.name,
          slug: this.createSlug(input.name),
          description: input.description,
          base: product,
        },
      ],
    });

    await this.connection.getRepository(ProductVariant).update(variant.id, {
      translations: [
        {
          id: variant.id as ID,
          languageCode: LanguageCode.en,
          name: input.name,
          base: variant,
        },
      ],
    });

    return product;
  }

  private generateSku(): string {
    return `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  private createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
