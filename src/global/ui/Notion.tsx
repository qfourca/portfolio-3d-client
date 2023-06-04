import api from '$/api/api';
import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import { Dna } from 'react-loader-spinner';
import Config from '../config/Config';
export default class NotionComponent {
  private reactRoot: Root;
  private _url: string = '';
  private defaultZindex: string;
  private isOpenWidth: boolean = true;
  public open(time: number) {
    this.element.style.transition = time + 'ms';
    if (Config._.wideDevice) {
      this.element.style.width = '50%';
    } else {
      this.element.style.height = '50%';
      this.element.style.width = '100%';
    }
    this.isOpenWidth = Config._.wideDevice;
    setTimeout(() => {
      this.element.style.zIndex = '999';
    }, time);
  }
  public close(time: number) {
    this.url = '';
    if (this.isOpenWidth) {
      this.element.style.transition = time + 'ms';
      this.element.style.width = '0%';
    } else {
      this.element.style.height = '0%';
    }

    setTimeout(() => {
      this.element.style.zIndex = this.defaultZindex;
    }, time);
  }
  public set url(url: string) {
    this._url = url;
    this.reactRoot.render(<NotionComponent.ReactNotion url={this._url} />);
  }
  public get url() {
    return this._url;
  }
  constructor(public element: HTMLElement) {
    this.reactRoot = ReactDOM.createRoot(element);
    this.defaultZindex = element.style.zIndex;
  }

  private static ReactNotion(props: { url: string }) {
    const [response, setResponse] = useState<any | null>(null);
    useEffect(() => {
      setResponse(null);
      if (props.url != '') {
        api.get(`/notion/page?page=${props.url}`).then(({ data }) => {
          setResponse(data);
          console.log(data);
        });
      }
    }, [props.url]);

    return (
      <>
        {response === null ? (
          <div
            style={{
              width: '100%',
              height: '100%',
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
          <>
            <NotionRenderer
              recordMap={response}
              fullPage={false}
              isImageZoomable={false}
            />
          </>
        )}
      </>
    );
  }
}
