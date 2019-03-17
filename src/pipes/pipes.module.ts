import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { UserTagPipe } from './user-tag/user-tag';
@NgModule({
	declarations: [ThumbnailPipe,
    UserTagPipe],
	imports: [],
	exports: [ThumbnailPipe,
    UserTagPipe]
})
export class PipesModule {}
