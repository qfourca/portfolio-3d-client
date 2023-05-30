import api from '$/api/api';
import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion/src/styles.css';

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
      api.get(`/notion/page?page=${props.url}`).then((data) => {
        setResponse(data.data);
      });
    }, [props.url]);

    return (
      <>
        {' '}
        {response === null ? (
          <></>
        ) : (
          <NotionRenderer recordMap={response} fullPage={false} />
        )}
      </>
    );
  }
}
