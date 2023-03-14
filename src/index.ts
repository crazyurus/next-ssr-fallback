import { createElement, useState, useEffect, type ComponentProps, type FC } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';

class SSRFallback {
  private getServerSideProps: GetServerSideProps;

  constructor(options: { getServerSideProps: GetServerSideProps }) {
    this.getServerSideProps = options.getServerSideProps;
  }

  createGetServerSidePropsFunction(): GetServerSideProps {
    return async (context: GetServerSidePropsContext) => {
      try {
        return await this.getServerSideProps(context);
      } catch {
        return {
          props: {},
        };
      }
    };
  }

  withCSR<C extends FC<any>, P extends object = ComponentProps<C>>(component: C) {
    const HoC = (props: P) => {
      const [data, setData] = useState<P>();
      const router = useRouter();
      const isPropsEmpty = Object.keys(props).length === 0;
      const newProps = isPropsEmpty ? data : props;

      useEffect(() => {
        if (isPropsEmpty) {
          const context: GetServerSidePropsContext = {
            locale: router.locale,
            locales: router.locales,
            defaultLocale: router.defaultLocale,
            params: router.query,
            query: router.query,
            resolvedUrl: router.asPath,
            req: {} as any,
            res: {} as any,
          };

          this.getServerSideProps(context).then(result => {
            if ('props' in result) {
              setData(result.props as P);
            }
          });
        }
      }, []);

      if (newProps) {
        return createElement(component, newProps);
      }

      return null;
    };

    HoC.displayName = `Hoc(${component.name})`;

    return HoC;
  }
}

export default SSRFallback;
