import { format } from 'date-fns';
import { compose, Model } from 'objection';
import Visibility from 'objection-visibility';
import { timestampPlugin } from 'objection-timestamps';

const mixins = compose(
  Visibility,
  timestampPlugin({
    genDate: () => format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  }),
);

export class BaseModel extends mixins(Model) {
  readonly id: number;
}
