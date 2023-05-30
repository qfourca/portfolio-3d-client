import api from '$/api/api';
import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion/src/styles.css';
import { Dna } from 'react-loader-spinner';
export default class NotionComponent {
  private reactRoot: Root;
  private _url: string = '';
  public set url(url: string) {
    this._url = url;
    this.reactRoot.render(<NotionComponent.ReactNotion url={this._url} />);
  }
  public get url() {
    return this._url;
  }
  constructor(public element: HTMLElement) {
    this.reactRoot = ReactDOM.createRoot(element);
  }

  private static ReactNotion(props: { url: string }) {
    const [response, setResponse] = useState<any | null>(null);
    useEffect(() => {
      setResponse(null);
      api.get(`/notion/page?page=${props.url}`).then((data) => {
        setResponse(data.data);
      });
    }, [props.url]);

    return (
      <>
        {' '}
        {response === null ? (
          <div
            style={{
              width: '100%',
              height: 'calc(100vh - 40px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Dna
              visible={true}
              height="30%"
              width="30%"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        ) : (
          <NotionRenderer recordMap={response} fullPage={false} />
        )}
      </>
    );
  }
}
