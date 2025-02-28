import Link from 'next/link';
import React from 'react';
import { reistrictCharacters } from '../../utils/helpers';
import Image from 'next/image'

export const ModePostPreview = ({
  title,
  coverImage  = `${process.env.HOST_URL}/static/images/not_found.png`,
  slug,
}): JSX.Element =>(
  <Link as={`/posts/${slug}`} href={`/posts/${slug}`}>
    <a href={`/posts/${slug}`}>
      <div className="grid grid-cols-5 gap-4 my-1">
        <div className="col-span-3 m-auto">
          <p
            className="text-left text-gray-600 text-xl font-bold break-all my-auto"
            dangerouslySetInnerHTML={{ __html: reistrictCharacters(title, 80) }}
          />
        </div>
        <div className="col-span-2 m-auto">
          <Image
            className="rounded object-contain w-full"
            src={coverImage}
            alt={slug}
            loading="lazy"
            width={200}
            height={120}
          />
        </div>
      </div>
    </a>
  </Link>
);

