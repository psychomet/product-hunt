import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';

import PhotoSwipeLightbox from 'photoswipe/lightbox';

import { AssetFragment } from '@bigi-shop/shared-util-types';

import { AssetPreviewPipe } from '../asset-preview.pipe';

export type AssetWithDimensions = Pick<AssetFragment, 'id' | 'preview' | 'width' | 'height'>;
@Component({
  selector: 'bigi-asset-gallery',
  imports: [CommonModule, AssetPreviewPipe],
  templateUrl: './asset-gallery.component.html',
  styleUrl: './asset-gallery.component.scss',
})
export class AssetGalleryComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() assets?: AssetWithDimensions[] | any = [];
  @Input() selectedAssetId: string;
  @ViewChild('mainPreview', {static: false})
  featuredAssetLoaded = false;
  private mainPreview: ElementRef<HTMLImageElement>;

  selectedAsset?: AssetWithDimensions | any;
  private gallery: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
  }

  ngOnInit() {
      this.selectImage(this.selectedAssetId);
  }

  ngOnChanges() {
      if (this.assets) {
          this.initPhotoswipe();
          this.selectImage(this.selectedAssetId);
      }
  }

  ngAfterViewInit() {
      if (this.assets) {
          this.initPhotoswipe();
      }
  }

  onLoad() {
      console.log(`loaded`);
      this.featuredAssetLoaded = true;

  }

  private initPhotoswipe() {
      if (isPlatformBrowser(this.platformId)) {
          const items = this.assets?.map((asset: any) => ({
              src: asset.preview,
              msrc: asset.preview + '?preset=medium',
              width: asset.width || 1000,
              height: asset.height || 1000,
          }));
          this.gallery = new PhotoSwipeLightbox({
              dataSource: items,
              pswpModule: () => import('photoswipe'),
              showHideOpacity: true,
          });
          this.gallery.init();
      }
  }

  selectImage(assetId: string) {
      if (assetId != null) {
          this.selectedAsset = this.assets?.find((a: any) => a.id === assetId);
      } else {
          this.selectedAsset = this.assets?.[0];
      }
  }

  openImage(assetId: string) {
      if (!this.assets) {
          return;
      }
      const index = this.assets.findIndex((a: any) => a.id === assetId);
      this.gallery.loadAndOpen(index);
  }

}
